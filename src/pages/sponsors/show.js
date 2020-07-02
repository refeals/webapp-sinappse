import React, { useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { find, isUndefined } from "lodash"
import { Redirect } from "react-router-dom"

import { getSponsors } from "../../actions/sponsor_actions"

const Sponsor = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const sponsors = useSelector((state) => state.sponsors, shallowEqual)
  const dispatch = useDispatch()

  const spn = find(sponsors, (e) => e.id === match.params.sponsor_id)

  useEffect(() => {
    dispatch(getSponsors(event.id))
  }, [dispatch, event.id])

  if (isUndefined(spn)) {
    return <Redirect to={`/${event.id}/sponsors`} />
  }

  return (
    <>
      <div class="over-mainarea">
        <div class="over-sponsor">
          <img class="over-image" src={spn.image_url} alt={spn.name} />
          <h1 class="over-name">{spn.name}</h1>
        </div>
      </div>
      {spn.presentation_url && (
        <div class="over-footer">
          <a
            href={spn.presentation_url}
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-viewer"
          >
            Acessar Site
          </a>
        </div>
      )}
    </>
  )
}

export default Sponsor
