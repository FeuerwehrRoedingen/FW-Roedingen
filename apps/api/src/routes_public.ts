import { Router } from "express";

import { getFahrzeug, getFahrzeuge } from '../pocketbase/pocketbase.js'

export const public_router = Router();

public_router.get('/website/fahrzeuge', async (_req, res) => {
  const fahrzeuge = await getFahrzeuge();

  res.status(200).send(fahrzeuge).end();
});

public_router.get('/website/fahrzeug/:id', (req, res) => {
  const fahrzeug = getFahrzeug(req.params.id);

  res.status(200).send(fahrzeug).end();
});

/*
public_router.get('/website/', (_req, res) => {

});
*/
