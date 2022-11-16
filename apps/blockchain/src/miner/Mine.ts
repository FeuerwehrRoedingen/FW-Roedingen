import express from 'express'

import type { Block } from "../Block.js";
import { Pool } from './Pool.js';

export class Mine {
  static instance = new Mine([], null);
  #httpServer = express()

  constructor(
    public openBlocks: Block[],
    public pendingBlock: {block: Block, approval: string[]}|null,
    public port = 3448,
    public hostname = 'localhost'
  ){
    this.setupServer();
  }

  get currentBlock(){
    if(this.openBlocks.length > 0){
      return this.openBlocks[0];
    }
    return null;
  }

  setupServer(){
    this.#httpServer.get('/nonce', (_req, res) => {
      res.send(Pool.instance.someBlock);
    })
    this.#httpServer.post('/solution', (req, res) => {
      const {solver, solution, nonce } = req.body;

      if(!Pool.instance.has(nonce)){
        return res.status(404).end();
      }
      const block = Pool.instance.getByNonce(nonce);
      const solved = block.solve(solution, solver);
      return res.status(solved? 200:201).end();
    })

    this.#httpServer.listen(this.port, this.hostname, () => {
      console.log(`Mine listening on http://${this.hostname}:${this.port}`);
    });
  }
}