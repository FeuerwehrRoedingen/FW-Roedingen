export class Mint{
  private isSet: boolean

  constructor(
    private reward: (key: string) => void
  ){
    this.isSet = false
  }

  set lock(public_key: string){
    if(!this.isSet){
      this.isSet = true;
      this.reward(public_key)
    }
  }
}