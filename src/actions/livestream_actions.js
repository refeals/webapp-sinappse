import { GET_LIVESTREAM_ROOMS } from "../actions/action_types"

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
        url: `/act.php?action=live-get&event=${event_id}`
      }
    }
  }
}
