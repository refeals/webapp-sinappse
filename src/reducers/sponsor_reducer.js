import { GET_SPONSORS } from "../actions/action_types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SPONSORS:
      return action.payload

    default:
      return state
  }
}
