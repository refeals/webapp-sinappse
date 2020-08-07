import { isUndefined } from "lodash"
import queryString from "query-string"
import React, { useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { doChangePassword } from "../../actions/auth_actions"
import ViewerLoading from "../../ViewerLoading"

function ChangePassword({ showFooter, socialMediaButtons }) {
  const event = useSelector((state) => state.event, shallowEqual)
  const [passwd, setPasswd] = useState("")
  const [confirmPasswd, setConfirmPasswd] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const { code } = queryString.parse(location.search)

  const handleSetNewPassword = (e) => {
    e.preventDefault()

    if (passwd.length < 6) {
      toast("Senha deve conter pelo menos 6 dígitos")
      return
    }
    if (passwd !== confirmPasswd) {
      toast("Senha e Confirmação não são iguais")
      return
    }

    dispatch(
      doChangePassword(
        { code, passwd },
        {
          onSuccess: (msg) => {
            toast(msg)
            history.push(`/${event.slug}/login`)
          },
          onError: (err) => {
            toast(err)
            history.push(`/${event.slug}`)
          }
        }
      )
    )
  }

  if (isUndefined(event.id)) {
    return <ViewerLoading />
  }

  if (isUndefined(location)) {
    return <Redirect to="/" />
  }

  return (
    <>
      <div className="back-icon" onClick={() => history.goBack()}>
        <i className="fas fa-arrow-left"></i>
      </div>
      <div className="form-content">
        <p style={{ opacity: 0 }}>OU</p>

        {socialMediaButtons(false)}

        <p className="text">Insira sua nova senha</p>
        <form className="login-form forgot" onSubmit={handleSetNewPassword}>
          <input
            type="password"
            placeholder="Senha"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPasswd}
            onChange={(e) => setConfirmPasswd(e.target.value)}
          />
          <footer className={showFooter ? "" : "hide-footer"}>
            <div className="buttons">
              <button type="submit">Atualizar Senha</button>
            </div>
          </footer>
        </form>
      </div>
    </>
  )
}

export default ChangePassword
