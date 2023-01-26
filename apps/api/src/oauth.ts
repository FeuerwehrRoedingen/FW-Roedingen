import { randomBytes } from 'node:crypto'

import { Router } from "express";
import { v4 } from "uuid";

import type { AddressInfo } from "ws";

import { addAccessTokenToUser, addCode, authenticateUser, getAuthRequest, getUserFromToken, hasCode } from '../pocketbase/pocketbase.js'
import { renderLogin } from "./components/renderer.js";

export const oAuthRouter = Router();

async function generateToken(){
  return new Promise<string | null>((resolve, _reject) => {
    randomBytes(48, (err, buffer) => {
      if(err){
        console.error(err);
        return resolve(null);
      }
      return resolve(buffer.toString('hex'));
    })
  })
}

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

  const address = req.socket.address() as AddressInfo;

  if(!address.address){
    return res.status(500).end();
  }

  res
    .status(200)
    .send(renderLogin(query));
})
oAuthRouter.post('/oauth/authorize', async (req, res) => {
  return new Promise<void>(async (resolve, _reject) => {
    const { username, password } = req.body;
  
    if(!username || !password){
      res.status(401).send('username/password cannot be empty').end();
      return resolve();
    }

    try{
      const authResponse = await authenticateUser(username as string, password as string)
        .catch(error => {
          throw new Error(error);
        });
    }
    catch(error: any){
      res.status(401).send(error.message).end();
      return resolve();
    }

    const code = v4();
    await addCode(username, code)

    return res.status(200).send(JSON.stringify({code: code})).end();
  })
})

oAuthRouter.post('/oauth/token', async (req, res) => {
  const { code, grant_type, redirect_uri } = req.body;

  if(!(await hasCode(code))){
    return res.status(401).send('Code has expired').end();
  }

  const token = await generateToken();
  if(!token){
    return res.status(500).end();
  }

  const authRequest = await getAuthRequest(code);

  addAccessTokenToUser(token, authRequest.user);

  if(!token){
    return res.status(500).end();
  }

  return res.status(200).send(JSON.stringify({access_token: token}));
})

oAuthRouter.get('/oauth/userinfo', async (req, res) => {

  const token = req.headers.authorization?.split(' ')[1];

  if(!token){
    return res.status(403).end();
  }

  const user = await getUserFromToken(token);

  res.status(200).send(JSON.stringify(user)).end();
})
