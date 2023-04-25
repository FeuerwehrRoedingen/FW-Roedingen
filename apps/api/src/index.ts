import { createServer as createHttpServer, Server as HttpServer} from 'node:http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import body from 'body-parser'
import cors from 'cors'
import express, { Request, response } from 'express'
import session from 'express-session'
import { WebSocketServer } from 'ws'

import { init }         from './firebase'
import { router }       from './routers/routes'
import { oAuthRouter }  from './routers/routes_oauth'
import { publicRouter } from './routers/routes_public'
import { usersRouter }  from './routers/routes_users'
import { handle }       from './socket'

//
// Merging SessionData interface to add values to req.session
//
declare module "express-session" {
  interface SessionData {
    token: string;
    user: any;
  }
}

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

export function configureServer(): HttpServer{
  if(!process.env.SESSION_SECRET){
    console.error('no session secret provided')
    process.exit(1);
  }

  // initialize firebase
  init();

  // The three Servers
  const express_server = express();
  const HTTP_server = createHttpServer(express_server);
  const WS_server = new WebSocketServer({noServer: true});

  const sessionParser = session({
    secret: process.env.SESSION_SECRET!,
    proxy: true,
    saveUninitialized: true,
    cookie: { 
      httpOnly: true,
      maxAge: 1000 * 60 * 5, 
      path: '/',
      sameSite: 'none',
      secure: false
    },
    resave: false,
  });

  express_server.set('trust proxy', 1)
  express_server.use(cors());
  express_server.use(sessionParser);
  express_server.use(body.json());
  express_server.use(body.urlencoded({ extended: false }));
  express_server.use(router);
  express_server.use('/oauth',  oAuthRouter);
  express_server.use('/public', publicRouter);
  express_server.use('/users',  usersRouter);
  express_server.use(express.static(join(__dirname, '..', 'public')));

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
  
  WS_server.on('connection', handle)

  return HTTP_server
}
