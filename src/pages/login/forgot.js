import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"

function ForgotPassword({ showFooter, socialMediaButtons }) {
  const [email, setEmail] = useState("")
  const history = useHistory()
  const emailInput = useRef(null)

  const handleForgotPassword = (e) => {
    e.preventDefault()
    console.log("handleForgotPassword")
  }

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
              <button type="submit">Enviar</button>
            </div>
          </footer>
        </form>
      </div>
    </>
  )
}

export default ForgotPassword
