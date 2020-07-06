import { LOGIN, LOGOUT, GET_USER } from "../actions/action_types"

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
        `@sinappse-user-token-${action.event}`,
        JSON.stringify(action.payload)
      )
      return parseUserData(action.payload)

    case LOGOUT:
      localStorage.removeItem(`@sinappse-user-token-${action.payload.event_id}`)
      return initialState

    case GET_USER:
      const user = localStorage.getItem(`@sinappse-user-token-${action.event}`)
      try {
        return user ? parseUserData(JSON.parse(user)) : {}
      } catch (e) {
        return {}
      }

    default:
      return state
  }
}
