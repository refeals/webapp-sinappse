import { GET_LIVESTREAM_ROOMS, SEND_REDEEM_CODE } from "../actions/action_types"
import { api } from "../api"

// export const getLivestream = (event_id, callback) => (dispatch, getState) => {
//   api
//     .get(`/act.php?action=live-get&event=${event_id}`, {
//       headers: { Authorization: `Bearer ${getToken()}` }
//     })
//     .then((response) => {
//       if (response.data.success)
//         dispatch({ type: GET_LIVESTREAM_ROOMS, payload: response.data.data })
//       else throw Object.assign(new Error(response.data.msg), { code: 401 })
//     })
//     .then((res) => callback && callback())
//     .catch((err) => console.log(err))
// }

export const getLivestream = (event_id) => {
  return {
    type: GET_LIVESTREAM_ROOMS,
    payload: {
      request: {
        url: `/act.php`,
        params: { action: "v2/live-get", event_id },
      },
    },
  }
}

export const doSendRedeemCode = (
  { code, event_id, user_id },
  { onSuccess, onError },
) => (dispatch) => {
  const form = new FormData()
  form.set("code", code)
  form.set("event_id", event_id)
  form.set("user_id", user_id)

  api
    .post(`/act.php`, form, { params: { action: "v2/live-redeem-user-code" } })
    .then(({ data }) => {
      if (data.success) {
        dispatch({ type: SEND_REDEEM_CODE })
        return data.msg
      } else {
        throw data.msg
      }
    })
    .then((msg) => onSuccess(msg))
    .catch((err) => onError(err))
}
