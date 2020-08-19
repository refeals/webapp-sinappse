import {
  ASK_SEND_QUESTION,
  GET_PROGRAMS,
  SAVE_TALK_EVAL,
} from "../actions/action_types"
import { api } from "../api"

// export const getPrograms = (event_id, callback) => (dispatch, getState) => {
//   api
//     .get(`/act.php?action=agenda&event=${event_id}`, {
//       headers: { Authorization: `Bearer ${getToken()}` }
//     })
//     .then((response) => {
//       if (response.data.success)
//         dispatch({ type: GET_PROGRAMS, payload: response.data.eventPlaces })
//       else throw Object.assign(new Error(response.data.msg), { code: 401 })
//     })
//     .then(() => callback && callback())
//     .catch((err) => console.log(err))
// }

export const getPrograms = (event_id) => {
  return {
    type: GET_PROGRAMS,
    payload: {
      request: {
        url: `/act.php?action=agenda&event=${event_id}`,
      },
    },
  }
}

export const talkVote = ({ data, onSuccess, onError }) => (
  dispatch,
  getState,
) => {
  const form = new FormData()
  const { talk_id, user_id, score } = data
  form.set("data", JSON.stringify({ talk_id, user_id, score }))

  api
    .post(`/act.php`, form, {
      params: { action: "v2/talk-vote" },
      // headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then(({ data }) => {
      if (data.success) {
        dispatch({ type: SAVE_TALK_EVAL })
        return data.msg
      } else {
        throw data.msg
      }
    })
    .then((msg) => onSuccess && onSuccess(msg))
    .catch((err) => onError && onError(err))
}

export const askSend = ({ data, onSuccess, onError }) => (
  dispatch,
  getState,
) => {
  const form = new FormData()
  const { talk_id, user_id, question } = data
  form.set("data", JSON.stringify({ talk_id, user_id, question }))

  api
    .post(`/act.php`, form, {
      params: { action: "v2/ask-send" },
      // headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((data) => {
      if (data.success) {
        dispatch({ type: ASK_SEND_QUESTION })
        return data.msg
      } else {
        throw data.msg
      }
    })
    .then((msg) => onSuccess && onSuccess(msg))
    .catch((err) => onError && onError(err))
}
