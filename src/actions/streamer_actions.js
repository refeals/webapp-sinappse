import { api } from "../api"
import { GET_STREAMER } from "../actions/action_types"

import { getToken } from "../api/auth"

export const getStreamers = (code, callback) => (dispatch, getState) => {
  api
    .get(`/act.php?`, {
      params: { action: "v2/streamer", code },
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    .then((response) => {
      if (response.data.success)
        dispatch({ type: GET_STREAMER, payload: response.data.data })
      else throw Object.assign(new Error(response.data.msg), { code: 401 })
    })
    .then(() => callback && callback())
    .catch((err) => console.log(err))
}
