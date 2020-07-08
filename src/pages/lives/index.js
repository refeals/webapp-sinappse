import React, { useEffect } from "react"
import { useDispatch, useSelector, shallowEqual } from "react-redux"

import ViewerLoading from "../../ViewerLoading"

import { getEvent } from "../../actions/event_actions"
import { getLivestream } from "../../actions/livestream_actions"

import logo from "../../images/logo-white.png"

import "../../css/speaker_livestream.scss"
import { isUndefined } from "lodash"

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

  return (
    <div className="live-container">
      <header className="live-header">
        <div className="img-container">
          <img src={logo} alt="Sinappse Logo" />
        </div>
        <h1>Painel do Palestrante</h1>
        <h2 className="talk-name">{live.name}</h2>
        <i className="fas fa-broadcast-tower"></i>
      </header>

      <div className="live-video">
        <div className="video-container"></div>
      </div>

      <div className="live-manage"></div>
    </div>
  )
}

export default Lives
