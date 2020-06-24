import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { getLivestream } from "../../actions/livestream_actions"

const Livestream = ({ getLivestream, event, lives }) => {
  useEffect(() => {
    if (event.id) {
      const fetchData = async () => {
        await getLivestream(event.id)
      }
      fetchData()
    }
  }, [getLivestream, event.id])

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
      <ul className="livestream-list">{renderLivestreamList()}</ul>
    </>
  )
}

function mapStateToProps(state) {
  const { event, lives } = state
  return { event, lives }
}

const mapDispatchToProps = { getLivestream }

export default connect(mapStateToProps, mapDispatchToProps)(Livestream)
