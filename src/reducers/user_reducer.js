import { GET_USER, LOGIN, LOGOUT, SET_INITIAL } from "../actions/action_types"

const initialState = {}

const parseUserData = (user) => {
  return {
    ...user,
    id: parseInt(user.id)
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem(
        `@sinappse-user-token`,
        JSON.stringify({ ...action.payload, event: action.event })
      )
      return parseUserData(action.payload)

    case LOGOUT:
      localStorage.removeItem(`@sinappse-user-token`)
      return initialState

    case GET_USER:
      const user = localStorage.getItem(`@sinappse-user-token`)
      try {
        return user ? parseUserData(JSON.parse(user)) : {}
      } catch (e) {
        return {}
      }

    case SET_INITIAL:
      return initialState
    default:
      return state
  }
}
