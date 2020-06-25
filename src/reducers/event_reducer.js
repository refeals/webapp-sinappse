import { GET_EVENT } from "../actions/action_types"

const initialState = {
  sections: [],
  "categories-list": [],
  map: {},
  rooms: []
}

const setWebviewParams = (event) => {
  const ev = {
    ...event,
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

    default:
      return state
  }
}
