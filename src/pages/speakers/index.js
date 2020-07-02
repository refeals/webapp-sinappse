import React, { useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"

import { getSpeakers } from "../../actions/speaker_actions"

const Speakers = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const speakers = useSelector((state) => state.speakers, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isEmpty(speakers)) {
      dispatch(getSpeakers(match.params.event_id))
    }
  }, [dispatch, speakers, match.params.event_id])

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

export default Speakers
