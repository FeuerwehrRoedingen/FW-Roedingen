import crypto from 'crypto'

import { Chain } from '../Chain.js';
import { Registry } from './Registry.js'
import { Transaction } from '../Transaction.js';

export class Wallet{
  public privateKey: string;
  public publicKey: string;
  public balance: number;

  constructor(){
    const keypair = crypto.generateKeyPairSync('rsa',{
      modulusLength: 2048,
      publicKeyEncoding:  { type: 'spki',  format: 'pem'},
      privateKeyEncoding: { type: 'pkcs8', format: 'pem'},
    });

    this.privateKey = keypair.privateKey;
    this.publicKey = keypair.publicKey;
    this.balance = 0.0;
    Registry.instance.addWallet(this);
  }

  get getBalance(){
    return this.balance;
  }

  migrate(newWallet: Wallet){
    this.sendMoney(this.balance, newWallet);
  }

  delete() {
    if(this.balance === 0){
      Registry.instance.users.delete(this.publicKey);
    } else {
      throw new Error('Cannot delete not empty wallets');
    }
  }

  async sendMoney(amount: number, payee: Wallet): Promise<void>{
    return new Promise<void>(async (resolve, reject) => {
      if(this.balance < amount){
        reject('insufficient Wallet balance');
        return;
      }
      const transaction = new Transaction(amount, this, payee);
  
      const sign = crypto.createSign('SHA256');
      sign.update(transaction.toString()).end();
  
      const signature = sign.sign(this.privateKey);
      try{
        Chain.instance.addBlock(transaction, this.publicKey, signature);
      }
      catch(error){
        reject(error);
      }
      resolve();
    })
  }
}
