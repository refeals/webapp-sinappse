import {
  GET_ABSTRACTS_FAILURE,
  GET_ABSTRACTS_SUCCESS,
  SAVE_ABSTRACT_EVAL
} from "../actions/action_types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ABSTRACTS_SUCCESS:
      return action.payload
    case GET_ABSTRACTS_FAILURE:
      return initialState

    case SAVE_ABSTRACT_EVAL:
      return action.payload

    default:
      return state
  }
}
