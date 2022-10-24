/* * * * * * * * * * * * * * * * * *
 * Feuerwehr Rödingen OAuth Server *
 *                                 *
 * Index.ts                        *
 * Created by Thomas Düren         *
 * * * * * * * * * * * * * * * * * */

import express, { Request, Response} from 'express'
import { json, urlencoded } from 'body-parser'
import { join } from 'path';

import { initAuthServer } from './src/AuthServer'
import { generateBundles, generateHTML } from './src/Renderer'

async function bootstrap(){

  // Create Express app
  const app = express();
  const PORT = process.env.port || 3030;
  const HOSTNAME = 'auth.feuerwehr-roedingen.de';
  
  await generateHTML();
  await generateBundles();
  
  // Add Body Parser
  app.use(json());
  app.use(urlencoded({extended: false}));
  
  // Add OAuth Server
  const authServer = initAuthServer();
  
  // statically serve public folder
  app.use(express.static(join(__dirname, '..')))
  
  // OAuth Methods
  app.post('/oauth/token', authServer.token);
  
  app.get('/oauth/authorize', function(req, res){
    if (!req.app.locals.user) {
      return res.redirect(`/login?redirect=${req.path}&client_id=${req.query.client_id}&redirect_uri=${req.query.redirect_uri}`);
    }
  
    return res.redirect(`/authorize?redirect=${req.path}&client_id=${req.query.client_id}&redirect_uri=${req.query.redirect_uri}`);
  });
  app.post('/ouath/authorize', function(req, res){
    if (!req.app.locals.user) {
      return res.redirect(`/login?redirect=${req.path}&client_id=${req.query.client_id}&redirect_uri=${req.query.redirect_uri}`);
    }
  
    return authServer.authorize();
  });
  
  app.post('/login', function(req, res) {
    if (req.body.email !== 'thom@nightworld.com') {
    return res.redirect(`/login?client_id=${req.body.client_id}&redirect_uri=${req.body.redirect_uri}`);
  }
    return res.redirect(`/${req.body.redirect}?client_id=${req.body.client_id}&redirect_uri=${req.body.redirect_uri}`);
  });
  
  // Get secret.
  app.get('/secret', authServer.authenticate(), function(req, res) {
    // Will require a valid access_token.
    res.send('Secret area');
  });
  
  app.get('/public', function(req, res) {
    // Does not require an access_token.
    res.send('Public area');
  });
  
  // Error handler
  app.use(function(err: Error, req: Request, res: Response, next: () => void) {
    console.error(err);
    res.status(500).send('Internal Error').end();
  });
  
  // Start the Server
  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT} as ${HOSTNAME}`);
  });
}
bootstrap();
