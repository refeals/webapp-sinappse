import { GET_SPEAKERS } from "../actions/action_types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SPEAKERS:
      return action.payload

    default:
      return state
  }
}
