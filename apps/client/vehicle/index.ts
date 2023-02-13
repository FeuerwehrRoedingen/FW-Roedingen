import { createServer } from 'node:http'

import { WebSocketServer } from 'ws'

const httpServer = createServer();
const wsServer = new WebSocketServer({ noServer: true })

httpServer.on('upgrade', (req, socket, head) => {
  let authenticated = true;

  //TODO authenticate

  const token = req.url?.split('?')[1] 

  if(!authenticated){
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    socket.destroy();
  }

  wsServer.handleUpgrade(req, socket, head, (client, request) => {
    wsServer.emit('connection', client, request);
  })
})

httpServer.listen(9090, () => {
  console.log('success')
})