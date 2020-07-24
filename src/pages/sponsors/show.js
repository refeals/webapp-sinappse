import { find, isEmpty, isUndefined } from "lodash"
import React from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

const Sponsor = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const sponsors = useSelector((state) => state.sponsors, shallowEqual)

  const spn = find(sponsors, (e) => e.id === match.params.sponsor_id)

  if (isUndefined(spn)) {
    if (isEmpty(sponsors)) {
      return <Redirect to={`/${event.id}`} />
    } else {
      return <Redirect to={`/${event.id}/sponsors`} />
    }
  }

  return (
    <>
      <div className="over-mainarea">
        <div className="over-sponsor">
          <img className="over-image" src={spn.image_url} alt={spn.name} />
          <h1 className="over-name">{spn.name}</h1>
        </div>
      </div>
      {spn.presentation_url && (
        <div className="over-footer">
          <a
            href={spn.presentation_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-viewer"
          >
            Acessar Site
          </a>
        </div>
      )}
    </>
  )
}

export default Sponsor
