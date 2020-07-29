import { combineReducers } from "redux"
import abstract_reducer from "./abstract_reducer"
import event_reducer from "./event_reducer"
import exhibitor_reducer from "./exhibitor_reducer"
import livestream_reducer from "./livestream_reducer"
import program_reducer from "./program_reducer"
import speaker_reducer from "./speaker_reducer"
import sponsor_reducer from "./sponsor_reducer"
import top_menu_reducer from "./top_menu_reducer"
import user_reducer from "./user_reducer"

export default combineReducers({
  user: user_reducer,
  event: event_reducer,
  programs: program_reducer,
  speakers: speaker_reducer,
  exhibitors: exhibitor_reducer,
  sponsors: sponsor_reducer,
  abstracts: abstract_reducer,
  lives: livestream_reducer,
  topMenu: top_menu_reducer
})
