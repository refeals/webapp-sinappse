import {
  ASK_SEND_QUESTION,
  GET_PROGRAMS,
  SAVE_TALK_EVAL
} from "../actions/action_types"
import { api } from "../api"
import { getToken } from "../api/auth"

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
        url: `/act.php?action=agenda&event=${event_id}`
      }
    }
  }
}

export const talkVote = ({ talk, user, score }, callback) => (
  dispatch,
  getState
) => {
  api
    .post(
      `/act.php?action=talk-vote`,
      { talk, user, score },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    )
    .then((response) => {
      if (response.data.success)
        dispatch({ type: SAVE_TALK_EVAL, payload: response.data.msg })
      else throw Object.assign(new Error(response.data.msg), { code: 401 })
    })
    .then(() => callback && callback())
    .catch((err) => console.log(err))
}

export const askSend = ({ talk, name, question }, callback) => (
  dispatch,
  getState
) => {
  api
    .post(
      `/act.php?action=talk-vote`,
      { talk, name, question },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    )
    .then((response) => {
      if (response.data.success)
        dispatch({ type: ASK_SEND_QUESTION, payload: response.data.msg })
      else throw Object.assign(new Error(response.data.msg), { code: 401 })
    })
    .then(() => callback && callback())
    .catch((err) => console.log(err))
}
