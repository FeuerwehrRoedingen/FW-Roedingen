import { combineReducers } from "redux"

import calendarReducer from "./calendar.slice"

export default combineReducers({
  calendar: calendarReducer,
});
