import { GET_EXHIBITORS } from "../actions/action_types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EXHIBITORS:
      return action.payload

    default:
      return state
  }
}
