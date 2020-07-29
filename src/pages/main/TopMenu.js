import React from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { HIDE_TOP_MENU } from "../../actions/action_types"
import { doLogout } from "../../actions/auth_actions"

const TopMenu = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const topMenu = useSelector((state) => state.topMenu, shallowEqual)
  const dispatch = useDispatch()
  const history = useHistory()

  const redirectToHome = () => {
    history.push(`/${event.id}`)
  }

  const redirectToBack = () => {
    history.goBack()
  }

  const handleLogout = () => {
    dispatch({ type: HIDE_TOP_MENU })
    dispatch(doLogout(event.id))
    history.push(`/${event.id}`)
  }

  const style = {
    backgroundColor: event.eventColor,
    color: event.textColor
  }

  if (topMenu.hide) {
    return <></>
  }

  return (
    <div className="topmenu" style={style}>
      <button
        className="va-home"
        onClick={topMenu.goBack ? redirectToBack : redirectToHome}
      >
        <i className="fa fa-home" />
      </button>
      <h1 className="event-name">{event["event-name"]}</h1>
      <button className="va-logout" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt" />
      </button>
    </div>
  )
}

export default TopMenu
