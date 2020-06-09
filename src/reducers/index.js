import { combineReducers } from "redux"

import event_reducer from './event_reducer'

export default combineReducers({
  event: event_reducer,
})
