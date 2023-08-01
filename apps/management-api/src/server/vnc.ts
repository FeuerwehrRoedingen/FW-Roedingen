
import { ChildProcess, spawn } from 'node:child_process';
import type { IncomingMessage } from 'node:http';
import { Request, Response, Router } from 'express';
import httpProxy from 'http-proxy';

import { database } from '../DB';
import type { Server } from '../../prisma/client';

//-----------------------------------------------
// VNC Servers
//-----------------------------------------------
type VncServer = {
  server: Server;
  destPort: number;
  process: ChildProcess;
}
const servers = new Map<number, VncServer>();
const proxyServer = httpProxy.createProxyServer({ ws: true });

//-----------------------------------------------
// Start VNC Server
//-----------------------------------------------
async function startVnc(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  const server = await database.getServer(id);
  const destPort = 6000 + id;

  const data = {
    host: process.env.NODE_ENV === 'production' ? 'management.feuerwehr-roedingen.de' : 'localhost',
    port: process.env.NODE_ENV === 'production' ? 443 : 3002,
  }
  if (servers.has(id)) {
    return res.status(200).send(data);
  }

  const vncServer = spawn(
    'websockify',
    [destPort.toString(), `${server.ip}:5900`],
    { stdio: ['ignore', 'inherit', 'inherit'] }
  );
  const proxy = httpProxy.createProxyServer({
    target: `http://localhost:${destPort}`,
    ws: true,
    changeOrigin: true,
  });

  servers.set(id, {
    server,
    destPort,
    process: vncServer,
  });

  vncServer.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  vncServer.on('error', (err) => {
    console.log(`child process exited with error ${err}`);
  });

  res.status(201).send(data);
}

//-----------------------------------------------
// WS Proxy
//-----------------------------------------------
export const vncProxy = (id: string) => {
  const server = servers.get(parseInt(id, 10));
  if (!server)
    return null;

  return (req: IncomingMessage, socket: any, head: any) =>
    proxyServer.ws(req, socket, head, { target: `ws://localhost:${server.destPort}` });

}

//-----------------------------------------------
// Express Router
//-----------------------------------------------
export const vncRouter = Router();
vncRouter.post('/:id', startVnc);

export const vncCleanup = () => {
  for (const server of servers.values()) {
    proxyServer.close();
    proxyServer.removeAllListeners();
    server.process.kill();
  }
}
