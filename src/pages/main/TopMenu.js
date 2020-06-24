import React from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"

const TopMenu = ({ event, hide, title = event["event-name"], goHome }) => {
  const history = useHistory()

  const redirectToHome = () => {
    history.push(`/${event["id"]}`)
  }

  const redirectToBack = () => {
    history.goBack()
  }

  const style = {
    backgroundColor: event["event-color"],
    color: event["text-color"]
  }

  if (!hide)
    return (
      <div className="topmenu" style={style}>
        <button
          className="va-home"
          onClick={goHome ? redirectToHome : redirectToBack}
        >
          <i className="fa fa-home"></i>
        </button>
        <h1 className="event-name">{title}</h1>
      </div>
    )
}

function mapStateToProps(state) {
  const { event } = state
  return { event }
}

export default connect(mapStateToProps)(TopMenu)
