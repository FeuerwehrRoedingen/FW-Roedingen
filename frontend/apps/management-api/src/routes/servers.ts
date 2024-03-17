import express, { Router } from "express";
import ping from 'ping';

import { database } from '../DB.js'
import type { Server } from "@prisma/client";
import { logger } from "../Logger.js";

async function updateServerStatus(server: Server){
  try{
    const response = await ping.promise.probe(server.ip)
    let status;
  
    if(!response.alive){
      status = 'offline'
    }
    else {
      if(parseFloat(response.avg) < 10.0) {
        status = 'online'
      }
      else {
        status = 'slow'
      }
    }

    return database.updateServer(server.id, { status });
  }
  catch(e){
    logger.error(e);
    return server;
  }
}

export const serversRouter = Router();

serversRouter.use(express.json())

serversRouter.get('/', async (req, res) => {
  const servers = await database.getServers();

  res.json(servers);
});
serversRouter.post('/', async (req, res) => {
  const { name, ip, sshPort, vncPort } = req.body;

  const id = await database.addServer(name, ip, sshPort, vncPort)

  if(!id) 
    return res.status(500).json({ error: 'Failed to add server' });

  const server = await database.getServer(id)
    
  res.json(server);
});

serversRouter.get('/:id', async (req, res) => {
  const server = await database.getServer(parseInt(req.params.id, 10))

  if(!server)
    return res.status(404).json({ error: 'Server not found' });
    
  res.json(server);
});
serversRouter.delete('/:id', async (req, res) => {
  const server = await database.deleteServer(parseInt(req.params.id, 10))
    .catch(e => {
      logger.error(e);
      return res.status(500).json({ error: 'Failed to delete server' });
    });

  if(!server)
    return res.status(404).json({ error: 'Server not found' });

  res.json(server);
});
serversRouter.patch('/:id', async (req, res) => {
  req.body satisfies Partial<Omit<Server, 'id'>>;
  
  const server = await database.updateServer(parseInt(req.params.id, 10), req.body)

  if(!server)
    return res.status(404).json({ error: 'Server not found' });

  res.json(server);
});

serversRouter.get('/:id/update', async (req, res) => {
  try{
    updateServerStatus(await database.getServer(parseInt(req.params.id, 10)));
    res.status(200).json({ message: 'Server updated' });
  }
  catch(e){
    logger.error(e);
    res.status(500).json({ error: `Failed to update server ${req.params.id}` });
  }
});

serversRouter.get('/update', async (req, res) => {
  try{
    const servers = await database.getServers();
    const promises = servers.map(updateServerStatus);
  
    await Promise.all(promises);

    res.status(200).json({ message: 'Servers updated' });
  }
  catch(e){
    logger.error(e);
    res.status(500).json({ error: 'Failed to update servers' });
  }
});
