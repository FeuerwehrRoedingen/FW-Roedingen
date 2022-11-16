import crypto from 'crypto'

import { Block } from "./Block.js"
import { Pool } from './miner/Pool.js';
import { Mint } from './Mint.js';
import { Transaction } from "./Transaction.js"
import { Registry } from './user/Registry.js';
import { Wallet } from './user/Wallet.js';

export class Chain {
  public static instance = new Chain();

  chain: Block[];

  constructor() {
    this.chain = [];
  }

  get lastBlock(){
    return this.chain[this.chain.length -1];
  }

  reward(key: string){
    const Wallet = Registry.instance.getWallet(key)!;
    Wallet.balance += 1;
  }

  approve(nonce: number, solution: number){
    const hash = crypto.createHash('MD5');
    hash.update((nonce+solution).toString()).end();

    const attempt = hash.digest('hex');

    return attempt.substring(0,4) === '0000'
  }

  genesis(amount: number, firstWallet: Wallet){
    if(this.chain.length > 0){
      return;
    }
    const genesis = new Wallet();
    genesis.balance = amount

    this.chain = [new Block('GENESIS', new Transaction(amount, genesis, firstWallet), new Mint(this.reward))];

    genesis.delete();
  }

  async addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer): Promise<void>{
    return new Promise<void>(async(resolve, reject) => {
      const verifier = crypto.createVerify('SHA256');
      verifier.update(transaction.toString());
  
      const isValid = verifier.verify(senderPublicKey, signature);
  
      if(isValid){
        const newBlock = new Block(this.lastBlock.hash, transaction, new Mint(this.reward));
        Pool.instance.addBlock = newBlock;
        while(!newBlock.solution){

        }
        this.chain.push(newBlock);
        resolve();
      }
      reject('invalid hash');
    })
  }
}