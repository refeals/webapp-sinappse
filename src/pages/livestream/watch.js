import { isEmpty, isUndefined } from "lodash"
import React, { useState } from "react"
import ReactPlayer from "react-player"
import { shallowEqual, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import LivestreamAds from "./ads"
import LivestreamChat from "./chat"

const Watch = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const lives = useSelector((state) => state.lives, shallowEqual)

  const [playing, setPlaying] = useState(process.env.NODE_ENV === "production")
  const [iframeReady, setIframeReady] = useState(false)

  const live = lives.find((l) => l.id === parseInt(match.params.live_id))

  if (isUndefined(live)) {
    if (isEmpty(lives)) {
      return <Redirect to={`/${event.slug}`} />
    } else {
      return <Redirect to={`/${event.slug}/lives`} />
    }
  }

  const togglePlayPause = () => {
    setPlaying(!playing)
  }

  return (
    <div className="live-container">
      <div className={`video-container ${iframeReady ? "iframeReady" : ""}`}>
        <ReactPlayer
          url={`https://www.youtube.com/embed/${live.youtube_url}?autoplay=1&controls=0&disablekb=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&modestbranding=1`}
          className="react-player"
          playing={playing}
          controls={false}
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                showinfo: 0,
                rel: 0,
                iv_load_policy: 3,
                fs: 0,
                modestbranding: 1
              }
            }
          }}
          onReady={() => setIframeReady(true)}
        />
        {/* <iframe
          className="video"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={live.name}
          src={`https://www.youtube.com/embed/${live.youtube_url}?autoplay=1&controls=0&disablekb=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&modestbranding=1`}
        /> */}
        <LivestreamAds live={live} />
        <div className="overlay" onClick={togglePlayPause} />
      </div>
      <LivestreamChat live={live} iframeReady={iframeReady} />
    </div>
  )
}

export default Watch
