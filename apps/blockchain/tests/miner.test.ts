import { Miner } from '../src/miner/Miner.js'
import { Wallet } from '../src/user/Wallet.js';

const myWallet = new Wallet();

test('Miner can connect', () => {
  const miner = new Miner(myWallet.publicKey);

  try{
    miner.run(10);
  } catch(error){
    console.error('error');
  }
})