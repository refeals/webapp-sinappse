import React, { useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { Link } from "react-router-dom"

import { getLivestream } from "../../actions/livestream_actions"

const Livestream = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const lives = useSelector((state) => state.lives, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLivestream(match.params.event_id))
  }, [dispatch, match.params.event_id])

  const renderLivestreamList = () => {
    return lives.map((live) => {
      return (
        <Link
          to={`/${event.id}/lives/${live.id}`}
          key={live.id}
          className="nounderline"
        >
          <li className="livestream-list-item">
            <p className="live-name">
              {live.name}
              <i className="fas fa-broadcast-tower live-icon" />
            </p>
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

export default Livestream
