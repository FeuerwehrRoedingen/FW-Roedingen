import type { Block } from "../Block";

export class Pool{
  public static instance = new Pool();

  constructor(
    private blocks: Map<number, Block> = new Map()
  ){}

  get someBlock(): Block{
    return this.blocks.get([...this.blocks.keys()][Math.floor(Math.random() * this.blocks.size)])!
  }

  set addBlock(newBlock: Block){
    this.blocks.set(newBlock.nonce, newBlock);
  }

  set removeBlock(nonce: number){
    this.blocks.delete(nonce);
  }

  getByNonce(nonce: number): Block{
    return this.blocks.get(nonce)!;
  }

  has(nonce: number){
    return this.blocks.has(nonce);
  }
}