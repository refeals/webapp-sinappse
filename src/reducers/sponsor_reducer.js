import {
  GET_SPONSORS_FAILURE,
  GET_SPONSORS_SUCCESS,
  SET_INITIAL
} from "../actions/action_types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SPONSORS_SUCCESS:
      return action.payload.data.msg
    case GET_SPONSORS_FAILURE:
      return initialState

    case SET_INITIAL:
      return initialState
    default:
      return state
  }
}
