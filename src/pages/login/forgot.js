import React, { useEffect, useRef, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { doForgotPassword } from "../../actions/auth_actions"

function ForgotPassword({ showFooter, socialMediaButtons }) {
  const event = useSelector((state) => state.event, shallowEqual)
  const [email, setEmail] = useState("")

  const history = useHistory()
  const dispatch = useDispatch()

  const emailInput = useRef(null)

  const handleForgotPassword = (e) => {
    e.preventDefault()
    if (email.length > 0 && event.id) {
      dispatch(
        doForgotPassword(
          { email, event_id: event.id },
          {
            onSuccess: (msg) => {
              toast(msg)
              history.push(`/${event.slug}`)
            },
            onError: (err) => {
              toast(err)
            },
          },
        ),
      )
    }
  }

  useEffect(() => {
    emailInput.current.focus()
  }, [])

  return (
    <>
      <div className="back-icon" onClick={() => history.goBack()}>
        <i className="fas fa-arrow-left"></i>
      </div>
      <div className="form-content">
        <p className="text">Acesse sua conta</p>

        {socialMediaButtons()}

        <p style={{ opacity: 0 }}>OU</p>
        <form className="login-form forgot" onSubmit={handleForgotPassword}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailInput}
          />
          <footer className={showFooter ? "" : "hide-footer"}>
            <div className="buttons">
              <button
                type="submit"
                style={{ backgroundColor: event.eventColor }}
              >
                Enviar
              </button>
            </div>
          </footer>
        </form>
      </div>
    </>
  )
}

export default ForgotPassword
