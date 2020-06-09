import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import TopMenu from "../main/TopMenu"

import { api } from "../../api"

const Livestream = ({ event }) => {
  const [lives, setLives] = useState([])

  useEffect(() => {
    if (event.id) {
      api
        .get(`/act.php?action=prog-view-livestream&event=${event.id}`)
        .then((res) => setLives(res.data.data))
    }
  }, [event.id])

  const renderLivestreamList = () => {
    return lives.map((live) => {
      return (
        <Link to="#" key={live.talkid} className="nounderline">
          <li className="livestream-list-item">
            <p>{live.title}</p>
            <p>{live.description}</p>
            <p>{live.startDateTime}</p>
            <p>{live.name}</p>
          </li>
        </Link>
      )
    })
  }

  return (
    <>
      <TopMenu goHome />
      <ul className="livestream-list">{renderLivestreamList()}</ul>
    </>
  )
}

function mapStateToProps(state) {
  const { event } = state
  return { event }
}

export default connect(mapStateToProps)(Livestream)
