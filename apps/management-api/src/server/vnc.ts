
import { ChildProcess, spawn } from 'node:child_process';
import type { IncomingMessage } from 'node:http';
import { Request, Response, Router } from 'express';
import httpProxy from 'http-proxy';

import { database } from '../DB';
import type { Server } from '../../prisma/client';
import { logger } from '../Logger';

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
    host: process.env.NODE_ENV === 'production' ? 'management.feuerwehr-roedingen.de' : '127.0.0.1',
    port: process.env.NODE_ENV === 'production' ? 443 : 3002,
  }
  if (servers.has(id)) {
    return res.status(200).send(data);
  }

  const vncServer = spawn(
    'websockify',
    [destPort.toString(), `${server.ip}:${server.vncPort}`],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  servers.set(id, {
    server,
    destPort,
    process: vncServer,
  });

  vncServer.stdout.on('data', (data) => logger.log(`vncServer ${id}: ${data}`));
  vncServer.stderr.on('data', (data) => logger.error(`vncServer ${id}: ${data}`));

  vncServer.on('close', (code) => {
    logger.log(`child process exited with code ${code}`);
  });
  vncServer.on('error', (err) => {
    logger.error(`child process exited with error ${err}`);
  });
  setTimeout(() => {
    res.status(201).send(data);
  }, 2_000);
}

//-----------------------------------------------
// WS Proxy
//-----------------------------------------------
export const vncProxy = (id: string) => {
  const server = servers.get(parseInt(id, 10));
  if (!server)
    return null;

  return (req: IncomingMessage, socket: any, head: any) => {
    proxyServer.ws(
      req, socket, head, { 
        target: `ws://127.0.0.1:${server.destPort}` ,
        headers: {
          host: req.headers.host,
          Connection: 'Upgrade',
          upgrade: req.headers.upgrade,
        }
      }, 
      (_err) => {
        logger.error(`Error while proxying websocket: ${_err}`);
      },
    );
  }
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
