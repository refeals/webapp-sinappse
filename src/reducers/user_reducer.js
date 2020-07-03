import { GET_USER } from "../actions/action_types"

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      localStorage.setItem(
        `@sinappse-user-token-${action.payload.user.eventid}`,
        action.payload.token
      )
      return action.payload.user

    default:
      return state
  }
}
