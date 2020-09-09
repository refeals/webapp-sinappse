import React from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Livestream = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const lives = useSelector((state) => state.lives, shallowEqual)

  const renderLivestreamList = () => {
    return lives.map((live) => {
      return (
        <Link
          to={`/${event.slug}/lives/${live.id}`}
          key={live.id}
          className="nounderline"
        >
          <li className="livestream-list-item">
            <p className="live-name">
              {live.name}
              {live.is_private && <i className="fas fa-lock live-icon" />}
            </p>
          </li>
        </Link>
      )
    })
  }

  return <ul className="livestream-list">{renderLivestreamList()}</ul>
}

export default Livestream
