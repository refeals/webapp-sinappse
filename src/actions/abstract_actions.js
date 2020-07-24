import { GET_ABSTRACTS, SAVE_ABSTRACT_EVAL } from "../actions/action_types"
import { api } from "../api"
import { getToken } from "../api/auth"

// export const getAbstracts = (event_id, callback) => (dispatch, getState) => {
//   api
//     .get(`/act.php?action=abstracts&event=${event_id}`, {
//       headers: { Authorization: `Bearer ${getToken()}` }
//     })
//     .then((response) => {
//       if (response.data.success)
//         dispatch({ type: GET_ABSTRACTS, payload: response.data.msg })
//       else throw Object.assign(new Error(response.data.msg), { code: 401 })
//     })
//     .then(() => callback && callback())
//     .catch((err) => console.log(err))
// }

export const getAbstracts = (event_id) => {
  return {
    type: GET_ABSTRACTS,
    payload: {
      request: {
        url: `/act.php?action=abstracts&event=${event_id}`
      }
    }
  }
}

export const saveAbstractEval = ({ abstract, user, score }, callback) => (
  dispatch,
  getState
) => {
  api
    .post(
      `/act.php?action=abs-vote`,
      { abstract, user, score },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    )
    .then((response) => {
      if (response.data.success)
        dispatch({ type: SAVE_ABSTRACT_EVAL, payload: response.data.msg })
      else throw Object.assign(new Error(response.data.msg), { code: 401 })
    })
    .then(() => callback && callback())
    .catch((err) => console.log(err))
}
