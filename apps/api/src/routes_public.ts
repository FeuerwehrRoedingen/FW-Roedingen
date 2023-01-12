import { Router } from "express";

/**
 * @Note Router starts at /public
 */
export const public_router = Router();

public_router.get('/', (_req, res) => {
  res
});

public_router.get('/website/fahrzeuge', (_req, res) => {

});

public_router.get('/website/fahrzeug/:id', (_req, res) => {
  
});

public_router.get('/website/', (_req, res) => {

});
