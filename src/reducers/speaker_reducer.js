import {
  GET_SPEAKERS_FAILURE,
  GET_SPEAKERS_SUCCESS
} from "../actions/action_types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SPEAKERS_SUCCESS:
      return action.payload.data.msg
    case GET_SPEAKERS_FAILURE:
      return initialState

    default:
      return state
  }
}
