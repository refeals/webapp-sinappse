import { GET_SPONSORS_SUCCESS } from "../actions/action_types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SPONSORS_SUCCESS:
      return action.payload.data.msg

    default:
      return state
  }
}
