import { LOGIN, LOGOUT, GET_USER } from "../actions/action_types"

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem(
        `@sinappse-user-token-${action.event}`,
        JSON.stringify(action.payload)
      )
      return action.payload

    case LOGOUT:
      localStorage.removeItem(`@sinappse-user-token-${action.payload.event_id}`)
      return initialState

    case GET_USER:
      const user = localStorage.getItem(`@sinappse-user-token-${action.event}`)
      try {
        return user ? JSON.parse(user) : {}
      } catch (e) {
        return {}
      }

    default:
      return state
  }
}
