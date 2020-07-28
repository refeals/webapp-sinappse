import { GET_EVENT, SET_INITIAL } from "../actions/action_types"

const initialState = {
  sections: [],
  "categories-list": [],
  map: {},
  rooms: []
}

const setWebviewParams = (event) => {
  const ev = {
    ...event,
    eventColor: event["event-color"],
    textColor: event["text-color"],
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

    case SET_INITIAL:
      return initialState
    default:
      return state
  }
}
