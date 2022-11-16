import { readFileSync } from 'node:fs'
import { createServer as createHttpServer, Server as HttpServer} from 'node:http'
import { createServer as createHttpsServer, Server as HttpsServer, ServerOptions } from 'node:https'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import body from 'body-parser'
import cors from 'cors'
import cookies from 'cookie-parser'
import express, { Request, response } from 'express'
import session from 'express-session'
import { WebSocketServer } from 'ws'

import { router } from './routes.js'
import { handle } from './socket.js'

declare module "express-session" {
  interface SessionData {
    userId: string
  }
}
export function configureServer(): {https: HttpsServer, http: HttpServer}{
  if(!process.env.SESSION_SECRET){
    console.error('no session secret provided')
    process.exit(1);
  }
  
  global.__filename = fileURLToPath(import.meta.url);
  global.__dirname = dirname(__filename);
  
  const serverOptions: ServerOptions = {
    cert: readFileSync(join(__dirname, '..', '.cert', 'api.feuerwehr-roedingen.de.pem')),
    key : readFileSync(join(__dirname, '..', '.cert', 'api.feuerwehr-roedingen.de.key'))
  }
  const sessionParser = session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 5 },
    resave: false
  });
  const cookieParser = cookies(process.env.SESSION_SECRET, {});
  
  const express_server = express();
  const HTTPS_server = createHttpsServer(serverOptions, express_server);
  const HTTP_server = createHttpServer(express_server);
  const WS_server = new WebSocketServer({noServer: true});
  
  HTTPS_server.on('upgrade', (request: Request, socket, head) => {
    sessionParser(request, response, () => {
      if(!request.session.id){
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }
      WS_server.handleUpgrade(request, socket, head, (client) => {
        WS_server.emit('connection', client, request);
      });
    })
  })
  HTTP_server.on('upgrade', (request: Request, socket, head) => {
    sessionParser(request, response, () => {
      if(!request.session.id){
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }
      WS_server.handleUpgrade(request, socket, head, (client) => {
        WS_server.emit('connection', client, request);
      });
    })
  })
  
  express_server.use(cors());
  express_server.use(sessionParser);
  express_server.use(cookieParser);
  express_server.use(body.json());
  express_server.use(router);
  
  WS_server.on('connection', handle)

  return {
    https: HTTPS_server,
    http: HTTP_server
  };
}
