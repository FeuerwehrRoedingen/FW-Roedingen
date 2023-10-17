import { combineReducers } from '@reduxjs/toolkit'

import { optionsReducer } from './options.slice'
import { fpsReducer } from './fps.slice'

export const rootReducer = combineReducers({
  options: optionsReducer,
  fps: fpsReducer,
});
