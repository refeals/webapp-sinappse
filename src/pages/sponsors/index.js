import React, { useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { Link } from "react-router-dom"

import { getSponsors } from "../../actions/sponsor_actions"

const Sponsors = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const sponsors = useSelector((state) => state.sponsors, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSponsors(event.id))
  }, [dispatch, event.id])

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

export default Sponsors
