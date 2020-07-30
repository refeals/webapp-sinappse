import { GET_EVENT } from "../actions/action_types"
import { api } from "../api"
import { getToken } from "../api/auth"

export const getEvent = (slug, callback, err) => (dispatch, getState) => {
  api
    .get(`/act.php?action=v2/event&slug=${slug}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    .then((response) => {
      if (response.data.success && response.data.data.id)
        dispatch({ type: GET_EVENT, payload: response.data.data })
      else {
        if (err) err()
      }
    })
    .then(() => callback && callback())
    .catch((err) => console.log(err))
}
