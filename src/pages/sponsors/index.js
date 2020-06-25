import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"

import { getSponsors } from "../../actions/sponsor_actions"

const Sponsors = ({ getSponsors, event, sponsors }) => {
  useEffect(() => {
    if (event.id && isEmpty(sponsors)) {
      const fetchData = async () => {
        await getSponsors(event.id)
      }
      fetchData()
    }
  }, [getSponsors, sponsors, event.id])

  const renderSponsorList = () => {
    return sponsors.map((spn) => {
      return (
        <Link to={`/${event.id}/sponsors/${spn.id}`} key={spn.id}>
          <li className="sponsor-block">
            <img
              src={spn.image_url}
              alt={spn.description}
              className="sponsor-image"
            />
            <div className="sponsor-type">{spn.description}</div>
          </li>
        </Link>
      )
    })
  }

  return (
    <section id="viewer-sponsors">
      <ul className="viewer-blocklist">{renderSponsorList()}</ul>
    </section>
  )
}

function mapStateToProps(state) {
  const { event, sponsors } = state
  return { event, sponsors }
}

const mapDispatchToProps = { getSponsors }

export default connect(mapStateToProps, mapDispatchToProps)(Sponsors)
