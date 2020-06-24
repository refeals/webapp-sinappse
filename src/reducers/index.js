import { combineReducers } from "redux"

import event_reducer from "./event_reducer"
import exhibitor_reducer from "./exhibitor_reducer"
import livestream_reducer from "./livestream_reducer"

export default combineReducers({
  event: event_reducer,
  exhibitors: exhibitor_reducer,
  lives: livestream_reducer
})
