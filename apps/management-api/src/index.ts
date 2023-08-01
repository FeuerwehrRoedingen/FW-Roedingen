import { createServer } from 'node:http';
import { parse } from 'node:url'
import express from 'express';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import * as Sentry from '@sentry/node';

import { serversRouter } from './routes';
import { database } from './DB';
import { createSsh } from './server/ssh';
import { vncCleanup, vncProxy, vncRouter } from './server/vnc';

try {

config();

//-----------------------------------------------
// Servers
//-----------------------------------------------
const app = express();
const server = createServer(app);
const vncServer = createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
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
// Express
//-----------------------------------------------
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.use('/servers', serversRouter);
app.use('/vnc', vncRouter);

app.get('/', (req, res) => {
  //TODO implememnt OAPI docs
  res.send('FWR Management API!');
});

//-----------------------------------------------
// Socket.io
//-----------------------------------------------
io.on('connection', async (socket) => {
  const { id, type } = socket.handshake.query;

  if(typeof id !== 'string' || typeof type !== 'string') {
    socket.write('Invalid query parameters\n');
    socket.disconnect();
    return;
  }

  const server = await database.getServer(parseInt(id, 10));
  if(!server) {
    socket.write('Server not found\n');
    socket.disconnect();
    return;
  }

  if(type === 'ssh') {
    return createSsh(socket, server);
  }
    
  socket.disconnect();
});

//-----------------------------------------------
// HTTP Server
//-----------------------------------------------
vncServer.on('upgrade', (req, socket, head) => {
  try {
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
    console.error(err);
  }
});

server.listen(3001, '0.0.0.0', () => {
  console.log('API listening on port 3001');
});
vncServer.listen(3002, '0.0.0.0', () => {
  console.log('VNC listening on port 3002');
});

//-----------------------------------------------
// Cleanup
//-----------------------------------------------
process.on('exit', () => {
  vncCleanup()
});

}
catch(err) {
  console.error(err);
}
