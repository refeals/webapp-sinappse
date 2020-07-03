import React, { useEffect, useState } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { Redirect } from "react-router-dom"
import { isEmpty, isUndefined } from "lodash"

import LivestreamChat from "./chat"
import ViewerLoading from "../../ViewerLoading"

import { getLivestream } from "../../actions/livestream_actions"

const Watch = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const lives = useSelector((state) => state.lives, shallowEqual)
  const dispatch = useDispatch()

  const [loaded, setLoaded] = useState(false)

  const live = lives.find((l) => l.id === match.params.live_id)

  useEffect(() => {
    if (isEmpty(lives)) {
      dispatch(getLivestream(match.params.event_id, () => setLoaded(true)))
    } else {
      setLoaded(true)
    }
  }, [dispatch, lives, match.params.event_id])

  if (loaded) {
    if (isEmpty(lives) || isUndefined(live)) {
      return <Redirect to={`/${event.id}`} />
    }
  } else {
    return <ViewerLoading />
  }

  return (
    <div className="live-container">
      <div className="video-container">
        <iframe
          className="video"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={live.name}
          src={`https://www.youtube.com/embed/${live.youtube_url}?autoplay=1&controls=0&disablekb=1&showinfo=0&rel=0&iv_load_policy=3&fs=0`}
        />
      </div>
      <LivestreamChat live={live} />
    </div>
  )
}

export default Watch
