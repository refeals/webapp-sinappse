import {
  HIDE_TOP_MENU,
  SHOW_TOP_MENU,
  SET_TOP_MENU_GO_BACK,
  SET_TOP_MENU_GO_HOME
} from "../actions/action_types"

const initialState = {
  hide: true,
  goBack: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HIDE_TOP_MENU:
      return { ...state, hide: true }
    case SHOW_TOP_MENU:
      return { ...state, hide: false }
    case SET_TOP_MENU_GO_BACK:
      return { ...state, goBack: true }
    case SET_TOP_MENU_GO_HOME:
      return { ...state, goBack: false }

    default:
      return state
  }
}
