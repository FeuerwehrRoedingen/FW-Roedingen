import express, { Router } from "express";

import { database } from '../DB'
import type { Server } from "@prisma/client";

export const serversRouter = Router();

serversRouter.use(express.json())

serversRouter.get('/', async (req, res) => {
  const servers = await database.getServers()

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
