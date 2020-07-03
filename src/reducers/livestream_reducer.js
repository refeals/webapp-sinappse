import { GET_LIVESTREAM_ROOMS } from "../actions/action_types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIVESTREAM_ROOMS:
      return action.payload

    default:
      return state
  }
}
