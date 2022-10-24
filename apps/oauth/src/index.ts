/* * * * * * * * * * * * * * * * * *
 * Feuerwehr Rödingen OAuth Server *
 *                                 *
 * Main.ts                         *
 * Created by Thomas Düren         *
 * * * * * * * * * * * * * * * * * */

import express, { Request, Response} from 'express'
import { createServer } from 'http'
import bodyParser from 'body-parser'
import { join } from 'path';
import * as Dotenv from 'dotenv';
import expressOAuthServer from 'express-oauth-server';

import { generateBundles, generateHTML } from './Renderer.js'
import { model } from './model.js'

const env = Dotenv.config()
if(env.error){
  process.exit(1);
}

// Create Express app
export const express_server = express();
export const http_server = createServer(express_server)

// Add Body Parser
express_server.use(bodyParser.json());
express_server.use(bodyParser.urlencoded({extended: false}));

// Add OAuth Server
const authServer = new expressOAuthServer(model);

// statically serve public folder
express_server.use(express.static(join(__dirname, 'public')))

// OAuth Methods
express_server.post('/oauth/token', authServer.token({
  requireClientAuthentication: { authorization_code: false }
}));

express_server.get('/oauth/authorize', function(req, res){
  res.status(200).sendFile(join(__dirname, 'dist/login.html'));
});
express_server.post('/oauth/authorize', function(req, res){
  if (req.body.username !== 'thomas.dueren@feuerwehr-rödingen.de'){
    return res.status(401).end();
  }
  return authServer.authorize();
});

express_server.get('/secret', authServer.authenticate(), function(req, res) {
  // Will require a valid access_token.
  res.send('Secret area');
});

express_server.get('/public', function(req, res) {
  // Does not require an access_token.
  res.send('Public area');
});

// Error handler
express_server.use(function(err: Error, req: Request, res: Response, next: () => void) {
  console.error(err);
  res.status(500).send('Internal Error').end();
});
