import { createServer } from 'node:http';
import { parse } from 'node:url'
import express, { ErrorRequestHandler} from 'express';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import * as Sentry from '@sentry/node';
import { auth } from 'express-oauth2-jwt-bearer';
import cors from 'cors';
import httpProxy from 'http-proxy';

import { serversRouter, statusRouter } from './routes/index.js';
import { database } from './DB.js';
import { createSsh } from './server/ssh.js';
import { vncCleanup, vncProxy, vncRouter } from './server/vnc.js';
import { logger } from './Logger.js';

// add env variables to process.env type
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH0_AUDIENCE: string;
      AUTH0_ISSUER_BASE_URL: string;
      PORT: string;
      SOCKET_PORT: string;
    }
  }
}

try {

config();

if(!process.env.AUTH0_AUDIENCE || !process.env.AUTH0_ISSUER_BASE_URL) {
  logger.error('Missing AUTH0_AUDIENCE or AUTH0_ISSUER_BASE_URL');
  process.exit(1);
}

if(!process.env.PORT){
  logger.warn('Missing PORT, using default 3010');
}
if(!process.env.SOCKET_PORT){
  logger.warn('Missing SOCKET_PORT, using default 3011');
}

//-----------------------------------------------
// Authentication
//-----------------------------------------------
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

//-----------------------------------------------
// Servers
//-----------------------------------------------
const app = express();
const server = createServer(app);
const ioServer = createServer();
const ioProxy = httpProxy.createProxyServer({
  target: 'http://127.0.0.1:3002/socket.io'
});
const io = new Server(ioServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? 'https://management.feuerwehr-roedingen.de' : '*',
  }
});

//-----------------------------------------------
// Sentry
//-----------------------------------------------
Sentry.init({
  dsn: "https://f4d9464e6d2d551e9e50cec5a2d8916e@o4505608718385152.ingest.sentry.io/4505609457303552",
  integrations: [
    new Sentry.Integrations.Http({
      tracing: true
    }),
    new Sentry.Integrations.Express({
      app
    }),
  ],
  tracesSampleRate: 1.0
});

//-----------------------------------------------
// Error handling
//-----------------------------------------------
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {

  if(error.name === 'UnauthorizedError') {
    logger.warn(`Unauthorized request: ${request.url}\n -> from ${request.socket.remoteAddress}`);
    response.status(401);
    response.json({
      error: error.message || 'Unauthorized'
    });
    return;
  }

  logger.error(error);
  response.status(500);
  response.json({
    error: error.message || 'Internal server error'
  });
}

//-----------------------------------------------
// Express
//-----------------------------------------------
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(cors({origin: process.env.NODE_ENV === 'production' ? 'https://management.feuerwehr-roedingen.de' : '*'}));

app.use('/servers', jwtCheck, serversRouter);
app.use('/status', jwtCheck, statusRouter);
app.use('/vnc', jwtCheck, vncRouter);
app.use('/socket.io', (req, res) => {
  ioProxy.web(req, res);
});

app.get('/', jwtCheck, (req, res) => {
  //TODO implememnt OAPI docs
  res.send('FWR Management API!');
});

//-----------------------------------------------
// Socket.io
//-----------------------------------------------
io.on('connection', async (socket) => {

  logger.addListener('all', (message) => {
    socket.emit('log', message);
  });

  socket.on('ssh', async (id: string) => {
  
    const server = await database.getServer(parseInt(id, 10));
    if(!server) {
      socket.write('Server not found\n');
      socket.disconnect();
      return;
    }

    createSsh(socket, server);
  });
});

app.use(errorHandler)

//-----------------------------------------------
// HTTP Server
//-----------------------------------------------
server.on('upgrade', (req, socket, head) => {
  try {

    logger.info(`Upgrade request: ${req.url} -> from ${req.headers.origin}`);

    if(req.url.split('?')[0] === '/socket.io' || req.url.split('?')[0] === '/socket.io/'){
      ioServer.emit('upgrade', req, socket, head);
      return;
    }

    const {id} = parse(req.url!, true).query;

    if(typeof id !== 'string') {
      socket.write('Invalid query parameters\n');
      socket.destroy();
      return;
    }

    const proxy = vncProxy(id);
    if(!proxy) {
      socket.write('Server not found\n');
      socket.destroy();
      return;
    }
    proxy(req, socket, head);
  }
  catch(err) {
    logger.error(err);
  }
});

const API_PORT = parseInt(process.env.PORT || '3010');
const SOCKET_PORT = parseInt(process.env.SOCKET_PORT || '3011');

server.listen(API_PORT, '0.0.0.0', () => {
  logger.log(`API listening on port ${API_PORT}`);
  console.log(`API listening on port ${API_PORT}`);
});
ioServer.listen(SOCKET_PORT, '0.0.0.0', () => {
  logger.log(`Socket.io listening on port ${SOCKET_PORT}`);
  console.log(`Socket.io listening on port ${SOCKET_PORT}`);
});

//-----------------------------------------------
// Cleanup
//-----------------------------------------------
process.on('exit', (code) => {
  vncCleanup();
  logger.info(`Exiting with code ${code}`);
});
process.on('uncaughtException', (err) => {
  logger.error('[CRITICAL] uncaught exception:', err);
}); 
process.on('error', (err) => {
  logger.error(err);
});

}
catch(err) {
  logger.error(err);
  vncCleanup();
}
