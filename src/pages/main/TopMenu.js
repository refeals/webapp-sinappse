import React from "react"
import { useSelector, shallowEqual } from "react-redux"
import { useHistory } from "react-router-dom"

const TopMenu = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const topMenu = useSelector((state) => state.topMenu, shallowEqual)
  const history = useHistory()

  const redirectToHome = () => {
    history.push(`/${event["id"]}`)
  }

  const redirectToBack = () => {
    history.goBack()
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
        <i className="fa fa-home"></i>
      </button>
      <h1 className="event-name">{event["event-name"]}</h1>
    </div>
  )
}

export default TopMenu
