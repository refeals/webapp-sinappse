import { toast } from "react-toastify"
import { api } from "../api"
import { LOGIN, LOGOUT, LOGOUT_EXPIRED_TOKEN, SIGNUP } from "./action_types"

export const doLogin = ({ data, type, event_id }, { onSuccess, onError }) => (
  dispatch
) => {
  const form = new FormData()
  form.set("data", JSON.stringify(data))
  form.set("type", type)
  form.set("event_id", event_id)

  api
    .post(`/act.php`, form, { params: { action: "v2/login" } })
    .then(({ data }) => {
      if (data.success) {
        dispatch({ type: LOGIN, payload: data.data, event_id })
      } else {
        throw data.msg
      }
    })
    .then(() => onSuccess())
    .catch((err) => onError(err))
}

export const doSignUp = ({ data, event }, { onSuccess, onError }) => (
  dispatch
) => {
  const form = new FormData()
  form.set("data", JSON.stringify(data))
  form.set("event_id", event.id)

  api
    .post(`/act.php`, form, { params: { action: "v2/signup" } })
    .then(({ data }) => {
      if (data.success) {
        dispatch({ type: SIGNUP, payload: data.data, event_slug: event.slug })
      } else {
        throw data.msg
      }
    })
    .then(() => onSuccess && onSuccess())
    .catch((err) => onError && onError(err))
}

export const doLogout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT, payload: {} })
}

export const doLogoutExpiredToken = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT_EXPIRED_TOKEN })
  toast("Token expirado! Por favor, entre novamente.")
}
