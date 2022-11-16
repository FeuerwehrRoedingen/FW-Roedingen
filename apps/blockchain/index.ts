/*********************************************************
 * FireCoin Blockchain
 * 
 * index.ts
 * © Thomas Düren<t.dueren@feuerwehr-roedingen.de>
 *********************************************************/

import { Registry } from "./src/user/Registry.js";
import { Wallet } from "./src/user/Wallet.js";

/**
 * Creates a new Wallet with new RSA keys
 * @returns newly created Wallet
 */
export function addWallet(): Wallet{
  const newWallet = new Wallet();
  return newWallet;
}
/**
 * Deletes a wallet from the registry 
 * @important if balance is not 0, deletion is not possible
 * @param public_key 
 */
export function deleteWallet(public_key: string){
  Registry.instance.deleteWallet(public_key);
}
/**
 * creates a new Wallet with new Keys and transfers account balance over
 * @important currently old transaction history gets lost
 * @param public_key 
 * @returns newly created Wallet
 */
export function updateKeys(public_key: string){
  const oldWallet = Registry.instance.getWallet(public_key);
  const newWallet = new Wallet();
  oldWallet?.migrate(newWallet);
  return newWallet;
}

/**
 * Gets a Wallet from the registry
 * @param public_key 
 * @returns Wallet
 */
export function getWallet(public_key: string): Wallet|undefined{
  return Registry.instance.getWallet(public_key);
}

/**
 * starts the mining Loop
 * @important loop currently cannot be stopped
 */
export async function mine(){

}
