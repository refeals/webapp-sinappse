import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"

import { getSpeakers } from "../../actions/speaker_actions"

const Speakers = ({ getSpeakers, event, speakers }) => {
  useEffect(() => {
    if (event.id && isEmpty(speakers)) {
      const fetchData = async () => {
        await getSpeakers(event.id)
      }
      fetchData()
    }
  }, [getSpeakers, speakers, event.id])

  const renderSpeakerList = () => {
    return speakers.map((spk) => {
      return (
        <Link to={`/${event.id}/speakers/${spk.speakerid}`} key={spk.speakerid}>
          <li className="speaker-block">
            <img className="speaker-img" src={spk.image_url} alt={spk.name} />
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

function mapStateToProps(state) {
  const { event, speakers } = state
  return { event, speakers }
}

const mapDispatchToProps = { getSpeakers }

export default connect(mapStateToProps, mapDispatchToProps)(Speakers)
