import express, { RequestHandler, Router } from 'express'
import { createServer } from 'http'

import { System } from './system.js'

const guard: RequestHandler = (req, res, next) => {
  if(req.query.token === process.env.SECRET){
    return next();
  }
  return res.status(401).end();
}

export class Server {
  static instance: Server = new Server();

  #expressServer = express();
  #httpServer = createServer(this.#expressServer);

  constructor(){
    if(Server.instance){
      throw new Error('Cannot construct another Server Object');
    }

    this.init();
  }

  init(){
    const router = Router();
    router.use(guard);
    router.get('/open/:name', (req, res) => {
      let status = System.instance.open(req.params.name);
      res.status(status).end();
    });
    router.get('/close/:name', (req, res) => {
      let status = System.instance.close(req.params.name);
      res.status(status).end();
    });
    router.get('/stop/:name', (req, res) => {
      let status = System.instance.stop(req.params.name);
      res.status(status).end();
    });
    router.get('/status/:name', (req, res) => {
      res.status(200).send('WIP');
    })

    this.#expressServer.use(router);
  }

  run(port: number = 8080, hostname: string = 'localhost'){
    this.#httpServer.listen(port, hostname, () => {
      console.log(`Server listening on http://${hostname}:${port}`)
    })
  }
}
