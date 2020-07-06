import { toast } from "react-toastify"

import { api } from "../api"

import { LOGIN, LOGOUT, LOGOUT_EXPIRED_TOKEN, SIGNUP } from "./action_types"

export const doLogin = (email, passwd, event, callback) => (
  dispatch,
  getState
) => {
  const form = new FormData()
  form.set("email", email)
  form.set("passwd", passwd)

  api
    .post(`/act.php?action=v2/login`, form)
    .then((response) => {
      if (response.data.success) {
        dispatch({ type: LOGIN, payload: response.data.data, event })
      } else {
        // toast(response.data.message)
        throw Object.assign(new Error("Usuário ou Senha inválidos"), {
          code: 401
        })
      }
    })
    .then(() => callback && callback())
    .catch((err) => console.log(err))
}

export const doLogout = (event_id) => (dispatch, getState) => {
  dispatch({ type: LOGOUT, payload: { event_id } })
}

export const doLogoutExpiredToken = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT_EXPIRED_TOKEN })
  toast("Token expirado! Por favor, entre novamente.")
}

export const doSignUp = (user, callback) => (dispatch, getState) => {
  let form = new FormData()

  form.set("username", user.username)
  form.set("password", user.password)
  form.set("name", user.name)
  form.set("phone", user.phone)
  form.set("zip_code", user.zip_code.replace("-", ""))
  form.set("address", user.address)
  form.set("number", user.number)
  form.set("neighbourhood", user.neighbourhood)
  form.set("city", user.city)
  form.set("state", user.state)
  form.set("complement", user.complement)

  if (user.cpf) {
    form.set("cpf", user.cpf)
    form.set("marital_status", user.marital_status)
  }

  if (user.cnpj) {
    form.set("cnpj", user.cnpj)
  }

  // _.each(user.documents, (doc) => {
  //   form.append("documents[]", doc, doc.name)
  // })

  api
    .post("/user", form, { headers: { "Content-Type": "multipart/form-data" } })
    .then((response) => {
      if (response.data.success) {
        response.data.token &&
          dispatch({ type: SIGNUP, payload: response.data })
        // toast(response.data.message)

        if (callback) callback()
      } else {
        toast(response.data.message)
      }
    })
    .catch((err) => console.log(err))
}
