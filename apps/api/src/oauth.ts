import { Router } from "express";
import { v4 } from "uuid";

import { authenticateUser } from './pocketbase.js'
import { renderLogin } from "./components/renderer.js";

export const oAuthRouter = Router();

oAuthRouter.get('/oauth/authorize', (req, res) => {
  if(
    typeof req.query.client_id !== 'string' ||
    typeof req.query.redirect_uri !== 'string' ||
    typeof req.query.response_type !== 'string'
    ){
    return res.status(400).end();
  }

  const query = req.query as {
    client_id: string;
    scope: string;
    redirect_uri: string;
    response_type: string;
    state: string;  
  }

  console.log(req.query);

  res
    .status(200)
    .send(renderLogin(query));
})
oAuthRouter.post('/oauth/authorize', async (req, res) => {
  return new Promise<void>(async (resolve, _reject) => {
    const {username, password} = req.body;
  
    if(!username || !password){
      res.status(401).end();
      resolve();
      return;
    }
  
    const authResponse = await authenticateUser(username as string, password as string)
      .catch(_error => {
        //console.error(_error);
        res.status(401).end();
        resolve(); //bricht nicht ab
      })

    const code = v4();
    return res.status(200).send(JSON.stringify({code: code})).end();
  })
})

oAuthRouter.post('/oauth/access_token', (req, res) => {
  const {code} = req.body;

  console.log(code);

  res.status(200);
})

oAuthRouter.get('/oauth/userinfo', (req, res) => {
  console.log(req);

  res.status(200);
})
