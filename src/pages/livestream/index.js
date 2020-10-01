import React, { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getLivestream } from "../../actions/livestream_actions"

const Livestream = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const lives = useSelector((state) => state.lives, shallowEqual)

  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    Promise.all([dispatch(getLivestream(event.id))]).then((res) => {
      setIsLoading(false)
    })
  }, [dispatch, event.id])

  const userCode = localStorage.getItem(
    `@sinappse-${event.slug}-livestream-lock`,
  )

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
              {live.is_private &&
                (userCode ? (
                  <i className="fas fa-lock-open live-icon" />
                ) : (
                  <i className="fas fa-lock live-icon" />
                ))}
            </p>
          </li>
        </Link>
      )
    })
  }

  if (isLoading) {
    return (
      <div className="loading-icon">
        <i className="fa fa-spinner fa-spin" />
      </div>
    )
  }

  return <ul className="livestream-list">{renderLivestreamList()}</ul>
}

export default Livestream
