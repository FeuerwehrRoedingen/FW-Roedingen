import express from 'express';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';

import { serversRouter } from './src/routes';

config();

const app = express();
const server = createServer(app);

app.use(express.json());

app.use('/servers', serversRouter);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('Socket connected');
});

server.listen(3001, () => {
  console.log('API listening on port 3001');
})
