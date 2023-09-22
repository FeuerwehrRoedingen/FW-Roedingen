import { Router } from 'express';
import { cpus, freemem, hostname, totalmem } from 'os';
import { logger } from '../Logger.js';

export const statusRouter = Router();

statusRouter.get('/', (req, res) => {
  res.json({
    hostname: hostname(),
    cpus: cpus(),
    freemem: freemem(),
    totalmem: totalmem(),
  });
});

statusRouter.get('/logs', (req, res) => {
  res.set('Content-Type', 'text/plain');
  logger.getLogs(res);
});
statusRouter.get('/logs/:level', (req, res) => {
  res.set('Content-Type', 'text/plain');
  logger.getLogs(res, req.params.level);
});
