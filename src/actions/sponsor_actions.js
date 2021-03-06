import { GET_SPONSORS } from "../actions/action_types"

// export const getSponsors = (event_id, callback) => (dispatch, getState) => {
//   api
//     .get(`/act.php?action=sponsors&event=${event_id}`, {
//       headers: { Authorization: `Bearer ${getToken()}` }
//     })
//     .then((response) => {
//       if (response.data.success)
//         dispatch({ type: GET_SPONSORS, payload: response.data.msg })
//       else throw Object.assign(new Error(response.data.msg), { code: 401 })
//     })
//     .then(() => callback && callback())
//     .catch((err) => console.log(err))
// }

export const getSponsors = (event_id) => {
  return {
    type: GET_SPONSORS,
    payload: {
      request: {
        url: `/act.php?action=sponsors&event=${event_id}`
      }
    }
  }
}
