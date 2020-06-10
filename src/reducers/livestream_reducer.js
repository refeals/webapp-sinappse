import { GET_LIVESTREAM } from "../actions/action_types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIVESTREAM:
      return action.payload

    default:
      return state
  }
}
