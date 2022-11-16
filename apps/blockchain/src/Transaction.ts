import type { Wallet } from "./user/Wallet";

export class Transaction{
  constructor(
    public amount: number,
    public payer: Wallet,
    public payee: Wallet,
  ){
    payer.balance -= amount;
    payee.balance += amount;
  }

  toString(): string{
    return JSON.stringify({
      amount: this.amount,
      from: this.payer.publicKey,
      to: this.payee.publicKey
    });
  }
}
