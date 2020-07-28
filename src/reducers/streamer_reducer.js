import { GET_STREAMER, SET_INITIAL } from "../actions/action_types"

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STREAMER:
      return action.payload

    case SET_INITIAL:
      return initialState
    default:
      return state
  }
}
