import { Router } from 'express'
import { v4 } from 'uuid'

import { authenticateUser, getHost, getHosts } from './pocketbase'
import { destroy } from './socket'

export const router = Router();

router.get('/', (_req, res) => {
  res.status(200).send('under construction').end();
})

router.post('/login', async (req, res) => {
  if(!req.body){
    return res.status(401).end();
  }
  const { username, password } = req.body;

  if(!username || !password){
    return res.status(401).end();
  }
  try{
    const data = await authenticateUser(username, password);
    //TODO save data.token in sessin store

    req.session.userId = v4();
    return res.status(200).end();
  }
  catch(error:any){
    console.log(error);
    return res.status(401).end();
  }
})

router.delete('/logout', (req, res) => {
  req.session.destroy(err => {
    if(err){
      console.error(err);
      return res.status(500).end();
    }
    destroy(req.session.id);
    return res.status(201).end();
  });
})

router.get('/servers', async (_req, res) => {
  const items = await getHosts();
  return res.status(200).send(JSON.stringify(items));
});
router.get('/server', async(req, res) => {
  if(typeof req.query.q !== 'string'){
    return res.status(400).end();
  }
  const item = await getHost(req.query.q);
  if(item){
    return res.send(item).end();
  }
  return res.status(404).end();
})