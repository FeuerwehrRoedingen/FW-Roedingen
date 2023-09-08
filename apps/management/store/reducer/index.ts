import { combineReducers } from "@reduxjs/toolkit"

import { logsReducer }    from './logs.slice'
import { serversReducer } from './servers.slice'
import { statusReducer }  from './status.slice'

export const rootReducer = combineReducers({
  logState:     logsReducer,
  serversState: serversReducer,
  statusState:  statusReducer,
});

export * from './logs.slice'
export * from './servers.slice'
export * from './status.slice'