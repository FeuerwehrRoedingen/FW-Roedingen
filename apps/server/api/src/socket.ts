import { Request } from 'express'
import { spawn } from 'node-pty'
import { WebSocket } from 'ws'

import { getHost } from 'fw-roedingen-pocketbase'

const map = new Map<string, WebSocket>()

export async function handle(socket: WebSocket, request: Request){
  map.set(request.session.id, socket);
  if(request.url.split('/')[1] === 'term'){
    return handleTerminal(socket, request);
  }

  if(request.url.split('/')[1] === 'chat'){
    return handleMessages(socket, request);
  }

  socket.close();
}

export function destroy(userID: string){
  map.get(userID)?.close();
}

async function handleTerminal(socket: WebSocket, request: Request){
  const host = await getHost(request.url.split('/').at(-1)!);
  const child = spawn('zsh', [], {
    name: 'XTerm',
    cwd: process.cwd(),
    //@ts-ignore
    env: process.env,
    handleFlowControl: true
  })

  socket.onmessage = async (event) => {
    let message = event.data.toString('utf-8');
    if(message.startsWith('resize')){
      let parts = message.split(':');
      console.log('resizing', parts);
      if(parts.length !== 3){
        return;
      }

      let width = parseInt(parts[1]);
      let height = parseInt(parts[2]);
      child.resize(width, height);

      return;
    }
    child.write(message+'\n');
  }
  child.onData(data => {
    socket.send(data);
  })
  child.write('ssh -l admin -i .cert/id_rsa '+host+'\n')
}
function handleMessages(socket: WebSocket, request: Request){
  console.log(request.session);

  socket.send('test 123')
}