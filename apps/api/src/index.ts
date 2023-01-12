import { createServer as createHttpServer, Server as HttpServer} from 'node:http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import body from 'body-parser'
import connectRedis from 'connect-redis'
import cors from 'cors'
import express, { Request, response } from 'express'
import session from 'express-session'
import redis from 'redis'
import { WebSocketServer } from 'ws'

import { oAuthRouter } from './oauth.js'
import { router } from './routes.js'
import { handle } from './socket.js'

import type { AuthSystemFields } from '../pocketbase/pocketbase-types'

//
// Merging SessionData interface to add values to req.session
//
declare module "express-session" {
  interface SessionData {
    token: string;
    user: AuthSystemFields;
  }
}
export function configureServer(): HttpServer{
  if(!process.env.SESSION_SECRET){
    console.error('no session secret provided')
    process.exit(1);
  }
  
  // dirname and filename are not supported by default in es6
  global.__filename = fileURLToPath(import.meta.url);
  global.__dirname = dirname(__filename);

  // The three Servers
  const express_server = express();
  const HTTP_server = createHttpServer(express_server);
  const WS_server = new WebSocketServer({noServer: true});

  // Create Redis session store and connect it to session parser
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    socket: {
      host: 'localhost',
      port: 6379
    },
    legacyMode: true,
    //password: process.env.REDIS_PASSWORD
  })
  redisClient.on('error', err => {
    console.error('[Redis]',err);
    process.exit(1);
  })
  redisClient.on('connect', () => {
    console.log('[Redis] Connected to Redis')
  })

  redisClient.connect();

  const sessionParser = session({
    secret: process.env.SESSION_SECRET!,
    proxy: true,
    saveUninitialized:true,
    cookie: { 
      httpOnly: true,
      maxAge: 1000 * 60 * 5, 
      path: '/',
      sameSite: 'none',
      secure: false
    },
    resave: false,
    store: new RedisStore({client: redisClient})
  });

  express_server.set('trust proxy', 1)
  express_server.use(cors());
  express_server.use(sessionParser);
  express_server.use(body.json());
  express_server.use(router);
  express_server.use(oAuthRouter);
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
