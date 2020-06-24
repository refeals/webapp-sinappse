import { GET_ABSTRACTS, SAVE_ABSTRACT_EVAL } from "../actions/action_types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ABSTRACTS:
      return action.payload
    case SAVE_ABSTRACT_EVAL:
      return action.payload

    default:
      return state
  }
}
