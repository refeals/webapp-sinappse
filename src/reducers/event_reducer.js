import { GET_EVENT } from "../actions/action_types"

const initialState = {
  sections: [],
  "categories-list": [],
  map: {},
  rooms: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENT:
      return action.payload

    default:
      return state
  }
}
