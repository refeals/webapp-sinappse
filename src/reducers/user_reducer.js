import { LOGIN, LOGOUT } from "../actions/action_types"

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem(
        `@sinappse-user-token-${action.event}`,
        action.payload.token
      )
      return action.payload

    case LOGOUT:
      localStorage.removeItem(`@sinappse-user-token-${action.payload.event_id}`)
      return initialState

    default:
      return state
  }
}
