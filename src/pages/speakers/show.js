import React, { useEffect, useState } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { find, isUndefined, isEmpty } from "lodash"
import { Redirect } from "react-router-dom"

import ViewerLoading from "../../ViewerLoading"

import { getSpeakers } from "../../actions/speaker_actions"

const Speaker = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const speakers = useSelector((state) => state.speakers, shallowEqual)
  const dispatch = useDispatch()

  const [loaded, setLoaded] = useState(false)

  const spk = find(speakers, (s) => s.speakerid === match.params.speaker_id)

  useEffect(() => {
    dispatch(getSpeakers(event.id, () => setLoaded(true)))
  }, [dispatch, event.id])

  if (loaded) {
    if (isEmpty(speakers) || isUndefined(spk)) {
      return <Redirect to={`/${event.id}`} />
    }
  } else {
    return <ViewerLoading />
  }

  const renderTalks = () => {
    return spk.talks.map((talk) => {
      return (
        <div className="speaker-talk" key={talk.talkid}>
          <div className="speaker-talktime">
            <i className="fa fa-clock" />
            {talk.talkStart}
          </div>
          <div className="speaker-talktitle">{talk.title}</div>
        </div>
      )
    })
  }

  return (
    <>
      <section id="viewer-speaker">
        <div className="over-mainarea">
          <div className="over-speaker">
            <img className="over-image" src={spk.image_url} alt={spk.name} />
            <h1 className="over-name">{spk.name}</h1>
            <div className="over-section over-paragraph speaker-description">
              <div className="over-subtitle">Descrição</div>
              {spk.bio}
            </div>
            <div className="over-section speaker-talks">
              <div className="over-subtitle">Programação</div>
              {renderTalks()}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Speaker
