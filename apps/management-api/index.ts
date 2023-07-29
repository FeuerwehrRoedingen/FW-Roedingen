import express from 'express';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';
import * as Sentry from '@sentry/node';

import { serversRouter } from './src/routes';

config();

//-----------------------------------------------
// Servers
//-----------------------------------------------
const app = express();
const server = createServer(app);
const io = new Server(server);

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

//-----------------------------------------------
// Socket.io
//-----------------------------------------------
io.on('connection', (socket) => {
  console.log('Socket connected');
});

//-----------------------------------------------
// HTTP Server
//-----------------------------------------------
server.listen(3001, () => {
  console.log('API listening on port 3001');
})
