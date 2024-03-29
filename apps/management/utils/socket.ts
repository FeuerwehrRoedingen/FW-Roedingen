import { io, Socket } from 'socket.io-client';

const protocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws';
const host = process.env.NODE_ENV === 'production' ? 'management.feuerwehr-roedingen.de' : '127.0.0.1:3010';
const path = process.env.NODE_ENV === 'production' ? 'api/v1/socket.io' : '/socket.io';

let socket: Socket|undefined = undefined;

export const getSocket = () => {
  if(socket)
    return socket;

  socket = io(`${protocol}://${host}`, {
    path
  });

  return socket;
};
