import { Router } from "express";

import { database } from '../DB'
import { create as createSSH } from '../server/ssh'

export const serversRouter = Router();

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

  console.log(req.params.id, server);

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

serversRouter.post('/:id/ssh', async (req, res) => {
  const server = await database.getServer(parseInt(req.params.id, 10));

  if(!server)
    return res.status(404).json({error: 'Server not found'});

  if(!req.body)
    return res.status(404).json({error: 'No Body'});

  const { username, password } = await req.body.json(); 

  if(!username || !password)
    return res.status(404).json({error: 'Missing credentials'});

  const url = await createSSH(server, username, password);
  
  return res.json(url);
});
serversRouter.get('/:id/vnc', (req, res) => {

});
serversRouter.get('/:id/update', (req, res) => {

});
