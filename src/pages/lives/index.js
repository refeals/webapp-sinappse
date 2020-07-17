import React, { useEffect, useState } from "react"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { isUndefined } from "lodash"
// import ReactPlayer from "react-player"

import ViewerLoading from "../../ViewerLoading"
import Chat from "./chat"
import Surveys from "./surveys"

import { getEvent } from "../../actions/event_actions"
import { getStreamers } from "../../actions/streamer_actions"
import { getLivestream } from "../../actions/livestream_actions"

import logo from "../../images/logo-white.png"

function Lives() {
  const event = useSelector((state) => state.event, shallowEqual)
  const lives = useSelector((state) => state.lives, shallowEqual)
  const streamer = useSelector((state) => state.streamer, shallowEqual)
  const dispatch = useDispatch()

  const [iframeSize, setIframeSize] = useState("800px")
  // const [playing, setPlaying] = useState(true)
  // const [volume, setVolume] = useState(1)

  useEffect(() => {
    document.getElementById("root").className = "desktop"
  }, [])

  useEffect(() => {
    dispatch(getStreamers("code"))
  }, [dispatch])

  useEffect(() => {
    if (streamer.event_id) {
      dispatch(getEvent(streamer.event_id))
      dispatch(getLivestream(streamer.event_id))
    }
  }, [dispatch, streamer.event_id])

  const live = lives.find((l) => l.id === streamer.live_id)

  function startConference() {
    try {
      const domain = "meet.jit.si"
      const options = {
        roomName: `sinappse_ev${event.id}_r${live.id}`,
        width: "100%",
        height: "100%",
        parentNode: document.getElementById("live-video-container"),
        interfaceConfigOverwrite: {
          filmStripOnly: false,
          SHOW_JITSI_WATERMARK: false
        },
        configOverwrite: {
          disableSimulcast: false
        }
      }
      const api = new window.JitsiMeetExternalAPI(domain, options)

      api.addEventListener("videoConferenceJoined", () => {
        console.log("Local User Joined")
        // setLoading(false);
        // api.executeCommand('displayName', 'MyName');
      })
    } catch (error) {
      console.error("Failed to load Jitsi API", error)
    }
  }

  useEffect(() => {
    if (
      !isUndefined(live) &&
      !isUndefined(live.id) &&
      !isUndefined(event) &&
      !isUndefined(event.id) &&
      window.JitsiMeetExternalAPI
    ) {
      console.log("=========================================================")
      startConference()
    } // eslint-disable-next-line
  }, [live, event])

  if (isUndefined(live)) {
    return <ViewerLoading />
  }

  const fbRefStr = `event/${event.id}/livestream/${live.id}`

  // const togglePlaying = () => setPlaying(!playing)
  // const toggleVolume = () => setVolume(volume === 0 ? 1 : 0)

  const renderIframeButton = (px, text) => (
    <button
      className={iframeSize === px ? "active" : ""}
      onClick={() => setIframeSize(px)}
    >
      {text}
    </button>
  )

  return (
    <div className="talk-live-container">
      <header className="live-header">
        <div className="img-container">
          <img src={logo} alt="Sinappse Logo" />
        </div>
        <h1>Painel do Palestrante</h1>
        <h2 className="talk-name">
          {live.name} ({live.advanced ? "Avançado" : "Básico"})
        </h2>
        <i className="fas fa-broadcast-tower"></i>
      </header>

      <div className="live-content">
        <div className="content-left">
          <div className="live-video">
            <div
              id="live-video-container"
              style={{ width: iframeSize, height: parseInt(iframeSize) / 2 }}
            >
              {/* <ReactPlayer
                url={`https://www.youtube.com/embed/${live.youtube_url}`}
                playing={playing}
                volume={volume}
                controls={false}
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
                style={{
                  zIndex: 999,
                  maxWidth: "100%",
                  transition: "width 0.2s ease, height 0.2s ease",
                  margin: "0 auto 8px"
                }}
                width={iframeSize}
                height={parseInt(iframeSize) / 2}
              /> */}
              {/* <div
                className="iframe-overlay"
                onClick={togglePlaying}
                style={{
                  width: iframeSize,
                  height: parseInt(iframeSize) / 2
                }}
              >
                <i className={`fas fa-${playing ? "play" : "pause"}`} />
              </div> */}
            </div>
            {/* <iframe
              className={`video ${iframeSize}`}
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={live.name}
              src={`https://www.youtube.com/embed/${live.youtube_url}?autoplay=1&controls=0&disablekb=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&modestbranding=1`}
            /> */}
            <div className="iframe-size-buttons">
              {renderIframeButton("400px", "1x")}
              {renderIframeButton("600px", "2x")}
              {renderIframeButton("800px", "3x")}
              {renderIframeButton("1000px", "4x")}
              {/* <button onClick={togglePlaying}>
                <i className={`fas fa-${playing ? "play" : "pause"}`} />
              </button>
              <button onClick={toggleVolume}>
                <i className={`fas fa-volume-${volume ? "up" : "mute"}`} />
              </button> */}
            </div>
          </div>
          <div className="live-surveys">
            <Surveys fbRefStr={fbRefStr} />
          </div>
        </div>

        <div className="live-manage">
          <Chat fbRefStr={fbRefStr} />
        </div>
      </div>
    </div>
  )
}

export default Lives
