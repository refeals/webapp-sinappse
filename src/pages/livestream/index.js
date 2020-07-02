import React, { useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { Link } from "react-router-dom"

import { getLivestream } from "../../actions/livestream_actions"

const Livestream = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const lives = useSelector((state) => state.lives, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLivestream(event.id))
  }, [dispatch, event.id])

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

export default Livestream
