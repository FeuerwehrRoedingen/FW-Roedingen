import { combineReducers } from '@reduxjs/toolkit'

import settingsReducer from './settings.slice';

export const rootReducer = combineReducers({
  settings: settingsReducer,
});
