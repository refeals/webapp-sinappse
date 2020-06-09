import { api } from "../api"
import { GET_EVENT } from "../actions/action_types"

import { getToken } from "../api/auth"

export const getEvent = (event_id, callback) => (dispatch, getState) => {
  api
    .get(`/act.php?action=evt-details&event=${event_id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    .then((response) => {
      if (response.data.success)
        dispatch({ type: GET_EVENT, payload: response.data.msg })
      else throw Object.assign(new Error(response.data.message), { code: 401 })
    })
    .then(() => (callback ? callback() : undefined))
    .catch((err) => console.log(err))
}
