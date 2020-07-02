import { api } from "../api"
import { GET_LIVESTREAM } from "../actions/action_types"

import { getToken } from "../api/auth"

export const getLivestream = (event_id, callback) => (dispatch, getState) => {
  api
    .get(`/act.php?action=prog-view-livestream&event=${event_id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    .then((response) => {
      if (response.data.success)
        dispatch({ type: GET_LIVESTREAM, payload: response.data.data })
      else throw Object.assign(new Error(response.data.msg), { code: 401 })
    })
    .then(() => callback && callback())
    .catch((err) => console.log(err))
}
