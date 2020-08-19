import React from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { HIDE_TOP_MENU } from "../../actions/action_types"
import { doLogout } from "../../actions/auth_actions"

const TopMenu = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const topMenu = useSelector((state) => state.topMenu, shallowEqual)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const setGoHome = () => {
    const { pathname } = location
    const splittedPathname = pathname.split("/")
    const { length } = splittedPathname

    return length > 2
  }

  const goHome = setGoHome()

  const redirectToHome = () => {
    history.push(`/${event.slug}`)
  }

  const redirectToBack = () => {
    history.goBack()
  }

  const handleLogout = () => {
    dispatch({ type: HIDE_TOP_MENU })
    dispatch(doLogout(event.slug))
    history.push(`/${event.slug}`)
  }

  const style = {
    backgroundColor: event.eventColor,
    color: event.textColor,
  }

  if (topMenu.hide) {
    return <></>
  }

  return (
    <div className="topmenu" style={style}>
      {goHome ? (
        <button className="va-home" onClick={redirectToBack}>
          <i className="fas fa-chevron-left"></i>
        </button>
      ) : (
        <button className="va-home" onClick={redirectToHome}>
          <i className="fa fa-home" />
        </button>
      )}
      <h1 className="event-name">{event.eventName}</h1>
      <button className="va-logout" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt" />
      </button>
    </div>
  )
}

export default TopMenu
