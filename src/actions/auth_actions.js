import { toast } from "react-toastify"
import { api } from "../api"
import { LOGIN, LOGOUT, LOGOUT_EXPIRED_TOKEN, SIGNUP } from "./action_types"

export const doLogin = (email, passwd, event_slug, { onSuccess, onError }) => (
  dispatch
) => {
  const form = new FormData()
  form.set("email", email)
  form.set("passwd", passwd)

  api
    .post(`/act.php?action=v2/login`, form)
    .then(({ data }) => {
      if (data.success) {
        dispatch({ type: LOGIN, payload: data.data, event_slug })
      } else {
        throw data.msg
      }
    })
    .then(() => onSuccess())
    .catch((err) => onError(err))
}

export const doSignUp = ({ data, type, event }, { onSuccess, onError }) => (
  dispatch
) => {
  let form = new FormData()

  form.set("data", data)
  form.set("type", type)
  form.set("event_id", event.id)

  api
    .post(`/act.php?`, form, {
      params: { action: "v2/signup" },
      headers: { "Content-Type": "multipart/form-data" }
    })
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
