import type { Wallet } from "./Wallet";

export class Registry {
  public static instance = new Registry();
  private constructor(
    public users: Map<string, Wallet> = new Map()
  ){}

  getWallet(public_key: string): Wallet|undefined{
    return this.users.get(public_key);
  }
  addWallet(wallet: Wallet){
    this.users.set(wallet.publicKey, wallet);
  }
  deleteWallet(public_key:string):void{
    const toDelete = this.users.get(public_key);
    toDelete?.delete();
  }
}