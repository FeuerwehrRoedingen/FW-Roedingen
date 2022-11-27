import { Arduino } from "./arduino.js";

//**********************************************************************************
// Edit names array to add Gates, everything is typed according to this array --+  *
// yes everything and it was awful typing this, thanks for asking.              |  *
// Before you ask... express delivers a string that indicates which Gate        |  *
// to open, so the most logical thing is to create this behemoth of types.      |  *
// I hope you like this ASCII art tho :)                                        |  *
//****************************************************************************  |  *
//                                                                              |  *
const names = <const> ['MTF','HLF','L2'];//<------------------------------------+  *
type Names = typeof names[number]//                                                *
//                                                                                 *
//**********************************************************************************

type StateResponse = 
  { status: 200, state: State }|
  { status: 404, state: undefined }

enum State{
  Open = 'Open',
  Opening = 'Opening',
  Closing = 'Closing',
  Closed = 'Closed',
  Halted = 'Halted',
  Error = 'Error',
}

class Gate {
  #state: State;
  #device: Arduino;

  constructor(
    public name: string,
    device: Arduino
  ){
    this.#device = device;
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
    this.#device.open(this.name);
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
    this.#device.close(this.name);
  }
  stop(){
    if(this.#state === State.Error){
      return;
    }
    this.#state = State.Halted;
    this.#device.stop(this.name);
  }

  state(){
    return this.#state;
  }
}

export class System {
  #gates: {
    [x in Names]: Gate
  }

  constructor(
    private device: Arduino = new Arduino()
  ){
    this.device.attachCallback(this.#setState);
  }

  static instance: System = new System;

  #setState(name: Names, state: string){
    if(state === 'open'){
      this.#gates[name].setState = State.Open;
      return;
    }
    if(state === 'closed'){
      this.#gates[name].setState = State.Closed;
      return;
    }
    if(state === 'error'){
      this.#gates[name].setState = State.Error;
      return;
    }
  }

  open(name: string): number{
    if(name in names){
      this.#gates[name as Names].open();
      return 200;
    }
    return 404;
  }
  close(name: string): number{
    if(name in names){
      this.#gates[name as Names].close();
      return 200;
    }
    return 404;
  }
  stop(name: string): number{
    if(name in names){
      this.#gates[name as Names].stop();
      return 200;
    }
    return 404;
  }
  state(name: string): StateResponse{
    if(name in names){
      const state = this.#gates[name as Names].state();
      return { status: 200, state };
    }
    return { status: 404, state: undefined };
  }
}
