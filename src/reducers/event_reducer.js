import { isNaN } from "lodash"
import { GET_EVENT } from "../actions/action_types"

const initialState = {
  sections: [],
  categoriesList: [],
  map: {},
  rooms: []
}

const setWebviewParams = (event) => {
  const ev = {
    ...event,
    id: !isNaN(parseInt(event.id)) ? parseInt(event.id) : event.id,
    sections: event.sections.map((s) => {
      if (s.type !== "WEBVIEW") {
        return s
      } else {
        const params = s.params.split(",")
        return {
          ...s,
          params: {
            type: params[0],
            value: params[1]
          }
        }
      }
    })
  }

  return ev
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENT:
      return setWebviewParams(action.payload)

    // case SET_INITIAL:
    //   return initialState
    default:
      return state
  }
}
