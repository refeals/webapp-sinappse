import { api } from "../api"
import { GET_PROGRAMS } from "../actions/action_types"

import { getToken } from "../api/auth"

export const getPrograms = (event_id, callback) => (dispatch, getState) => {
  api
    .get(`/act.php?action=agenda&event=${event_id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    .then((response) => {
      if (response.data.success)
        dispatch({ type: GET_PROGRAMS, payload: response.data.eventPlaces })
      else throw Object.assign(new Error(response.data.message), { code: 401 })
    })
    .then(() => callback && callback())
    .catch((err) => console.log(err))
}
