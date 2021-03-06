import { GET_EXHIBITORS } from "../actions/action_types"

// export const getExhibitors = (event_id, callback) => (dispatch, getState) => {
//   api
//     .get(`/act.php?action=exhibitors&event=${event_id}`, {
//       headers: { Authorization: `Bearer ${getToken()}` }
//     })
//     .then((response) => {
//       if (response.data.success)
//         dispatch({ type: GET_EXHIBITORS, payload: response.data.msg })
//       else throw Object.assign(new Error(response.data.msg), { code: 401 })
//     })
//     .then(() => callback && callback())
//     .catch((err) => console.log(err))
// }

export const getExhibitors = (event_id) => {
  return {
    type: GET_EXHIBITORS,
    payload: {
      request: {
        url: `/act.php?action=exhibitors&event=${event_id}`
      }
    }
  }
}
