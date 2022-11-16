import crypto from 'node:crypto'
import fetch from 'node-fetch'

export class Miner{
  constructor(
    private private_key: string
  ) {}
  
  async run(max: number){
    while(true){
      if(max === 0){
        return;
      }
      if(max > 0){
        --max;
      }
      const response = await fetch('http://localhost/nonce');
      const nonce: number|undefined = await response.json() as any;
      while(nonce){
        const solution = mine(nonce);
        await fetch('http://localhost/block',{
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            solver: this.private_key,
            solution,
            nonce
          })
        })
      }
    }
  }
}

function mine(nonce: number): number{
  let solution = 1;
  console.log('mining...');
  while(true){
    const hash = crypto.createHash('MD5');
    hash.update((nonce+solution).toString()).end();

    const attempt = hash.digest('hex');

    if(attempt.substring(0,4) === '0000'){
      console.log('Solved: '+solution);
      return solution;
    }
    solution += 1;
  }
}
