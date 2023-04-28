import { randomBytes } from 'node:crypto'

import { Router } from "express";
import { v4 } from "uuid";

import { renderLogin, renderSignUp } from "../components/bundle";
import { authenticateUser, createAuthRequest, createToken, getAuthRequest, getUserFromToken } from '../firebase'

export const oAuthRouter = Router();

async function generateToken(){
  return new Promise<string>((resolve, reject) => {
    randomBytes(48, (err, buffer) => {
      if(err){
        console.error(err);
        return reject();
      }
      return resolve(buffer.toString('hex'));
    })
  })
}

oAuthRouter.get('/authorize', (req, res) => {
  if(
    typeof req.query.client_id !== 'string' ||
    typeof req.query.redirect_uri !== 'string' ||
    typeof req.query.response_type !== 'string' ||
    typeof req.query.scope !== 'string' ||
    typeof req.query.state !== 'string'
    ){
    return res.status(400).end();
  }

  const query = req.query as {
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
    state: string;  
  }

  res.status(200);
  renderLogin(res);
})
oAuthRouter.post('/authorize', async (req, res) => {
  return new Promise<void>(async (resolve, _reject) => {
    const { email, password } = req.body;
  
    if(!email || !password){
      res.status(401).send('email/password cannot be empty').end();
      return resolve();
    }

    try{
      const authResponse = await authenticateUser(email as string, password as string)
        .catch(error => {
          console.error('error:',error);
          throw new Error(error);
        });
      if(!authResponse){
        throw new Error('Unauthorized');
      }
    }
    catch(error: any){
      res.status(401).send(error.message).end();
      return resolve();
    }

    const code = v4();
    createAuthRequest(email, code)
      .then(_authRequest => {
        res.status(200).send(JSON.stringify({code: code})).end();
      }, _reason => {
        console.error(_reason);
        // TODO: 
        // Change error code per error message
        // send error message
        res.status(400).end();
      })
  })
})

oAuthRouter.post('/token', async (req, res) => {
  const { code, grant_type, redirect_uri } = req.body;

  getAuthRequest(code)
    .then(async authRequest => {

      const accessToken  = await generateToken();
      const refreshToken = await generateToken();

      createToken(authRequest.uid, accessToken, refreshToken)
        .then(token => {
          res.status(200).send(JSON.stringify({ access_token: token.access_token, refresh_token: refreshToken })).end();
        }, reason => {
          console.error(reason);
          res.status(500).end();
        })
    }, _reason => {
      res.status(401).send('auth request expired');
    });
})

oAuthRouter.get('/userinfo', async (req, res) => {

  const token = req.headers.authorization?.split(' ');

  if(!token || token[0] !== 'Bearer'){
    return res.status(403).end();
  }

  getUserFromToken(token[1])
    .then(user => {
      let parsedUser = {
        id: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        photoURL: user.photoURL,
        profile: {
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          lastRefreshTime: user.metadata.lastRefreshTime,
          phoneNumber: user.phoneNumber,
          tokensValidAfterTime: user.tokensValidAfterTime,
          tenantId: user.tenantId
        }
      }
      res.status(200).send(JSON.stringify(parsedUser)).end();
    }, _reason => {
      res.status(404).end();
    });
})

oAuthRouter.delete('/logout', (req, _res) => {
  console.log(req);

  //TODO 

  
})