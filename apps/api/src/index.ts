import { createServer as createHttpServer, Server as HttpServer} from 'node:http'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import body from 'body-parser'
import cors from 'cors'
import cookies from 'cookie-parser'
import express, { Request, response } from 'express'
import session, { MemoryStore } from 'express-session'
import { User } from 'pocketbase'
import { WebSocketServer } from 'ws'

import { router } from './routes.js'
import { handle } from './socket.js'

declare module "express-session" {
  interface SessionData {
    userId: string;
    token: string;
    user: User;
  }
}
export function configureServer(): HttpServer{
  if(!process.env.SESSION_SECRET){
    console.error('no session secret provided')
    process.exit(1);
  }
  
  global.__filename = fileURLToPath(import.meta.url);
  global.__dirname = dirname(__filename);
  
  const sessionParser = session({
    secret: process.env.SESSION_SECRET!,
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 5 },
    resave: false,
    name: 'frontend',
    store: new MemoryStore({})
  });
  const cookieParser = cookies(process.env.SESSION_SECRET, {});
  
  const express_server = express();
  const HTTP_server = createHttpServer(express_server);
  const WS_server = new WebSocketServer({noServer: true});

  HTTP_server.on('upgrade', (request: Request, socket, head) => {
    try{
      sessionParser(request, response, () => {
      if(!request.session){
          socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
          socket.destroy();
          return;
        }
        WS_server.handleUpgrade(request, socket, head, (client) => {
          WS_server.emit('connection', client, request);
        });
      })
    } catch(error){
      console.error(error);
    }
  })
  
  express_server.use(cors());
  express_server.use(sessionParser);
  express_server.use(cookieParser);
  express_server.use(body.json());
  express_server.use(router);
  
  WS_server.on('connection', handle)

  return HTTP_server
}
