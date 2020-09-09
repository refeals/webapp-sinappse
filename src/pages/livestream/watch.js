import { isEmpty, isNull, isUndefined } from "lodash"
import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { getLivestream } from "../../actions/livestream_actions"
import { db } from "../../firebase"
import LivestreamAds from "./ads"
import LivestreamChat from "./chat"
import LivestreamCode from "./code"

const Watch = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const lives = useSelector((state) => state.lives, shallowEqual)
  const dispatch = useDispatch()
  const history = useHistory()

  const [playing, setPlaying] = useState(process.env.NODE_ENV === "production")
  const [iframeReady, setIframeReady] = useState(false)

  const [hasPrivateCode, setHasPrivateCode] = useState(
    localStorage.getItem(`@sinappse-${event.slug}-livestream-lock`),
  )

  const live = lives.find((l) => l.id === parseInt(match.params.live_id))

  const liveRefStr = `event/${event.id}/livestream/${live.id}/active`

  // redirect to /slug if room is deactivated
  useEffect(() => {
    db.ref(liveRefStr).on("value", (snapshot) => {
      const active = snapshot.val()
      if (active === false) {
        dispatch(getLivestream(event.id))
        history.push(`/${event.slug}/`)
      }
    })
  }, [liveRefStr, dispatch, event.id, event.slug, history])

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

  if (live.is_private) {
    if (isNull(hasPrivateCode)) {
      return <LivestreamCode setHasPrivateCode={setHasPrivateCode} />
    }
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
                modestbranding: 1,
              },
            },
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
