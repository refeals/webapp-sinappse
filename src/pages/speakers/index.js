import React from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Speakers = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const speakers = useSelector((state) => state.speakers, shallowEqual)

  const renderSpeakerList = () => {
    return speakers.map((spk) => {
      return (
        <Link
          to={`/${event.slug}/speakers/${spk.speakerid}`}
          key={spk.speakerid}
        >
          <li className="speaker-block">
            <div
              className="speaker-img"
              style={{
                background: `url(${spk.image_url}) no-repeat center center`
              }}
              alt={spk.name}
            />
            <div className="speaker-name">{spk.name}</div>
          </li>
        </Link>
      )
    })
  }

  return (
    <>
      <section id="viewer-speakers">
        <ul className="viewer-blocklist">{renderSpeakerList()}</ul>
      </section>
    </>
  )
}

export default Speakers
