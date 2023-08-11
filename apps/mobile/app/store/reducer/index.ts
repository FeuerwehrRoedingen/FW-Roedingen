import { combineReducers } from "@reduxjs/toolkit"

import { loginReducer } from "./login.slice";

export const rootReducer = combineReducers({
  login: loginReducer,
});
