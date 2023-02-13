import { Gate, State } from './gate'

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



export class System {
  #gates: {
    [x in Names]: Gate
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
