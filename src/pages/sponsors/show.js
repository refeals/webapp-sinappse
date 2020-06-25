import React, { useEffect } from "react"
import { connect } from "react-redux"
import { isEmpty, find, isUndefined } from "lodash"
import { Redirect } from "react-router-dom"

import { getSponsors } from "../../actions/sponsor_actions"

const Sponsor = ({ event, getSponsors, sponsors, match }) => {
  const spn = find(sponsors, (e) => e.id === match.params.sponsor_id)

  useEffect(() => {
    if (event.id && isEmpty(sponsors)) {
      const fetchData = async () => {
        await getSponsors(event.id)
      }
      fetchData()
    }
  }, [getSponsors, sponsors, event.id])

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

function mapStateToProps(state) {
  const { event, sponsors } = state
  return { event, sponsors }
}

const mapDispatchToProps = { getSponsors }

export default connect(mapStateToProps, mapDispatchToProps)(Sponsor)
