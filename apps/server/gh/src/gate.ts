import { exec } from 'node:child_process'

export enum State{
  Open = 'Open',
  Opening = 'Opening',
  Closing = 'Closing',
  Closed = 'Closed',
  Halted = 'Halted',
  Error = 'Error',
}

function write(action: string, gate: string){
  exec(`echo "${action}:${gate}" > /dev/ttyS0`)
}

export class Gate {
  #state: State;

  constructor(
    public name: string,
  ){
    this.#state = State.Halted
  }

  get getState(){
    return this.#state;
  }

  set setState(state:State){
    this.#state = state;
  }

  open(){
    if(
      this.#state === State.Error ||
      this.#state === State.Open ||
      this.#state === State.Opening 
    ){
      return;
    }
    this.#state = State.Opening;
    write('open', this.name);
  }
  close(){
    if(
      this.#state === State.Error ||
      this.#state === State.Closed ||
      this.#state === State.Closing 
    ){
      return;
    }
    this.#state = State.Closing;
    write('close', this.name);
  }
  stop(){
    if(this.#state === State.Error){
      return;
    }
    this.#state = State.Halted;
    write('stop', this.name);
  }

  state(){
    return this.#state;
  }
}