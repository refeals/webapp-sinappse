import { isEmpty, isUndefined } from "lodash"
import React, { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { HIDE_TOP_MENU, SHOW_TOP_MENU } from "../../actions/action_types"
import { doSendAccessCode } from "../../actions/auth_actions"
import ViewerLoading from "../../ViewerLoading"

function Code({ showFooter }) {
  const event = useSelector((state) => state.event, shallowEqual)
  const user = useSelector((state) => state.user, shallowEqual)
  const [code, setCode] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch({ type: HIDE_TOP_MENU })
  }, [dispatch])

  const handleSendAccessCode = (e) => {
    e.preventDefault()

    const event_codes = event.code.map((c) => c.code)
    if (event_codes.includes(code)) {
      dispatch(
        doSendAccessCode(
          { code, event: event.id, user: user.id },
          {
            onSuccess: (msg) => {
              localStorage.setItem(`@sinappse-${event.slug}-access-code`, true)
              dispatch({ type: SHOW_TOP_MENU })
              history.push(`/${event.slug}`)
            },
            onError: (err) => {
              toast(err)
            },
          },
        ),
      )
    } else {
      toast("Código inválido!")
    }
  }

  if (isUndefined(event.id)) {
    return <ViewerLoading />
  }

  if (isEmpty(event.code)) {
    return <Redirect to={`/${event.slug}`} />
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
            <footer className={showFooter ? "" : "hide-footer"}>
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

export default Code
