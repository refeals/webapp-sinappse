import React, { useEffect } from "react"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { isUndefined } from "lodash"

import ViewerLoading from "../../ViewerLoading"
import Chat from "./chat"

import { getEvent } from "../../actions/event_actions"
import { getLivestream } from "../../actions/livestream_actions"

import logo from "../../images/logo-white.png"

function Lives() {
  const event = useSelector((state) => state.event, shallowEqual)
  const lives = useSelector((state) => state.lives, shallowEqual)
  const dispatch = useDispatch()

  const live = lives[0]

  useEffect(() => {
    document.getElementById("root").className = "desktop"
  }, [])

  useEffect(() => {
    dispatch(getEvent(138))
  }, [dispatch])

  useEffect(() => {
    if (event.id) {
      dispatch(getLivestream(event.id))
    }
  }, [dispatch, event.id])

  if (isUndefined(live)) {
    return <ViewerLoading />
  }

  const fbRefStr = `event/${event.id}/livestream/${live.id}`

  return (
    <div className="talk-live-container">
      <header className="live-header">
        <div className="img-container">
          <img src={logo} alt="Sinappse Logo" />
        </div>
        <h1>Painel do Palestrante</h1>
        <h2 className="talk-name">{live.name}</h2>
        <i className="fas fa-broadcast-tower"></i>
      </header>

      <div className="live-content">
        <div className="content-left">
          <div className="live-video">
            <iframe
              className="video"
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={live.name}
              src={`https://www.youtube.com/embed/${live.youtube_url}?autoplay=1&controls=0&disablekb=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&modestbranding=1`}
            />
          </div>
          <div className="live-surveys">asd</div>
        </div>

        <div className="live-manage">
          <Chat fbRefStr={fbRefStr} />
        </div>
      </div>
    </div>
  )
}

export default Lives
