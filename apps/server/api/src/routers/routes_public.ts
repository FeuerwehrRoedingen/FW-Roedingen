import { Router } from "express";

import { getFahrzeug, getFahrzeuge } from '../../../pocketbase/pocketbase.js'

export const publicRouter = Router();

publicRouter.get('/website/fahrzeuge', async (_req, res) => {
  const fahrzeuge = await getFahrzeuge();

  res.status(200).send(fahrzeuge).end();
});

publicRouter.get('/website/fahrzeug/:id', (req, res) => {
  const fahrzeug = getFahrzeug(req.params.id);

  res.status(200).send(fahrzeug).end();
});

/*
public_router.get('/website/', (_req, res) => {

});
*/

publicRouter.get('/status', (_req, res) => {

  //TODO get Status of every service and server
  //Save values
  //Make them accesible here

  res.status(200).send('ok');
})