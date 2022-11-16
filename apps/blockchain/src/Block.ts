import crypto from 'crypto'
import { Chain } from './Chain.js';

import { Pool } from './miner/Pool.js';
import type { Mint } from './Mint.js';
import type { Transaction } from './Transaction.js';

export class Block{

  public nonce = this.setNonce();
  public solution: number|undefined;

  constructor(
    public prevHash: string,
    //TODO make multiple transactions possible
    public transaction: Transaction,
    public mint: Mint,
    public timeStamp = Date.now()
  ){}

  private setNonce(): number{
    while(true){
      let tmp = Math.round(Math.random() * 999999999);
      if(!Pool.instance.has(tmp)){
        return tmp;
      }
    }
  }

  get hash(){
    const str = JSON.stringify(this);
    const hash = crypto.createHash('SHA256');
    hash.update(str).end();
    return hash.digest('hex');
  }

  solve(solution: number, solver: string): boolean{
    if(Chain.instance.approve(this.nonce, solution)){
      this.mint.lock = solver
      Pool.instance.removeBlock = this.nonce;
      return true;
    }
    return false;
  }
}