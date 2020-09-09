import React, { useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { doSendRedeemCode } from "../../actions/livestream_actions"

function LivestreamCode({ setHasPrivateCode }) {
  const event = useSelector((state) => state.event, shallowEqual)
  const user = useSelector((state) => state.user, shallowEqual)
  const [code, setCode] = useState("")

  const dispatch = useDispatch()

  const handleSendAccessCode = (e) => {
    e.preventDefault()

    dispatch(
      doSendRedeemCode(
        { code, event_id: event.id, user_id: user.id },
        {
          onSuccess: (msg) => {
            localStorage.setItem(
              `@sinappse-${event.slug}-livestream-lock`,
              code,
            )
            setHasPrivateCode(code)
          },
          onError: (err) => {
            toast(err)
          },
        },
      ),
    )
  }

  return (
    <>
      <div
        className="login-page"
        style={{
          backgroundImage: `url(${event.bg})`,
          backgroundColor: event.eventColor,
        }}
      >
        <div className="form-content">
          <p style={{ opacity: 0 }}>OU</p>

          <p className="text">Insira o código de acesso</p>
          <form className="login-form forgot" onSubmit={handleSendAccessCode}>
            <input
              type="text"
              placeholder="Código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <footer>
              <div className="buttons">
                <button
                  type="submit"
                  style={{ backgroundColor: event.eventColor }}
                >
                  Enviar Código
                </button>
              </div>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}

export default LivestreamCode
