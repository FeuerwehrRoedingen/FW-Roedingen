import { Router } from 'express'
import { v4 } from 'uuid'

import { authenticateUser, getHost, getHosts } from './pocketbase.js'
import { destroy } from './socket.js'

export const router = Router();

router.get('/', (req, res) => {
  console.log(req.session);
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
    req.session.token = data.token;
    req.session.user = data.user;
    req.session.save( err => {
      if(err)
        console.error(err);
    });
    return res.status(200).send(data);
  }
  catch(error:any){
    console.log(error);
    return res.status(401).end();
  }
})

router.delete('/logout', (req, res) => {
  try{
    req.session.destroy(err => {
      if(err){
        console.error(err);
        return res.status(500).end();
      }
      //destroy(req.session.id);
      return res.status(201).end();
    });
  } catch(error){
    return res.status(500).end();
  }
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