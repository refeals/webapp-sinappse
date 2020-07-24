import { GET_SPEAKERS } from "../actions/action_types"

// export const getSpeakers = (event_id, callback) => (dispatch, getState) => {
//   api
//     .get(`/act.php?action=speakers&event=${event_id}`, {
//       headers: { Authorization: `Bearer ${getToken()}` }
//     })
//     .then((response) => {
//       if (response.data.success)
//         dispatch({ type: GET_SPEAKERS, payload: response.data.msg })
//       else throw Object.assign(new Error(response.data.msg), { code: 401 })
//     })
//     .then(() => callback && callback())
//     .catch((err) => console.log(err))
// }

export const getSpeakers = (event_id) => {
  return {
    type: GET_SPEAKERS,
    payload: {
      request: {
        url: `/act.php?action=speakers&event=${event_id}`
      }
    }
  }
}
