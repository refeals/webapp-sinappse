import { GET_STREAMER } from "../actions/action_types"

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STREAMER:
      return action.payload

    default:
      return state
  }
}
