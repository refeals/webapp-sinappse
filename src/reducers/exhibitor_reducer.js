import { GET_EXHIBITORS_SUCCESS } from "../actions/action_types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EXHIBITORS_SUCCESS:
      return action.payload

    default:
      return state
  }
}
