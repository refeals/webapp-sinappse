import {
  GET_LIVESTREAM_ROOMS_FAILURE,
  GET_LIVESTREAM_ROOMS_SUCCESS,
  SET_INITIAL
} from "../actions/action_types"

const initialState = []

const parseData = (lives) =>
  lives.map((live) => {
    return {
      ...live,
      id: parseInt(live.id),
      advanced: !!parseInt(live.advanced),
      active: !!live.active
    }
  })

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIVESTREAM_ROOMS_SUCCESS:
      return parseData(action.payload.data.data)
    case GET_LIVESTREAM_ROOMS_FAILURE:
      return initialState

    case SET_INITIAL:
      return initialState
    default:
      return state
  }
}
