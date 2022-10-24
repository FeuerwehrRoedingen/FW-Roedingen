import * as functions from 'firebase-functions';

import { express_server as apiServer } from '../lib/api/index.js'
// OAuth server throws cryptic error ...
// import { express_server as oauthServer } from '../lib/oauth/index.js'

const region = functions.region('europe-west3');

export const api = region.https.onRequest(apiServer);
export const auth = region.https.onRequest((req, res)=>{
  res.send('oauth under construction');
});
