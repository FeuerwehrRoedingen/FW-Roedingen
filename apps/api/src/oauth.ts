import { Router } from "express";
import { authenticateUser } from './pocketbase'

import { renderLogin } from "./components/renderer";

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
    redirect_uri: string;
    response_type: string;
  }

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

    //generate Code
    //get callback URL from client_id
    //send code to app
    return res.status(200).end();
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
