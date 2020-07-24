import {
  GET_EXHIBITORS_FAILURE,
  GET_EXHIBITORS_SUCCESS
} from "../actions/action_types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EXHIBITORS_SUCCESS:
      return action.payload
    case GET_EXHIBITORS_FAILURE:
      return initialState

    default:
      return state
  }
}
