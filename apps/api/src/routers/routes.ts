import { Router } from 'express'

import { getHost, getHosts } from '../../pocketbase/pocketbase.js'

export const router = Router();

router.get('/', (_req, res) => {
  res.status(200).send('under construction').end();
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
