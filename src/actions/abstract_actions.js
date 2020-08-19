import { GET_ABSTRACTS, SAVE_ABSTRACT_EVAL } from "../actions/action_types"
import { api } from "../api"

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
        url: `/act.php?action=abstracts&event=${event_id}`,
      },
    },
  }
}
export const saveAbstractEval = ({ data, onSuccess, onError }) => (
  dispatch,
) => {
  const form = new FormData()
  const { abstract_id, user_id, score } = data
  form.set("data", JSON.stringify({ abstract_id, user_id, score }))

  api
    .post(`/act.php`, form, {
      params: { action: "v2/abs-vote" },
      // headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then(({ data }) => {
      if (data.success) {
        dispatch({ type: SAVE_ABSTRACT_EVAL })
        return data.msg
      } else {
        throw data.msg
      }
    })
    .then((msg) => onSuccess && onSuccess(msg))
    .catch((err) => onError && onError(err))
}
