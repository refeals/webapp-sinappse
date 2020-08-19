import React from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Exhibitors = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const exhibitors = useSelector((state) => state.exhibitors, shallowEqual)

  const renderExhibitorList = () => {
    return exhibitors.map((exh) => {
      return (
        <Link to={`/${event.slug}/exhibitors/${exh.id}`} key={exh.id}>
          <li className="exhibitor-block">
            <img src={exh.image_url} alt={exh.name} className="exhibitor-img" />
          </li>
        </Link>
      )
    })
  }

  return (
    <section id="viewer-exhibitors">
      <ul className="viewer-blocklist">{renderExhibitorList()}</ul>
    </section>
  )
}

export default Exhibitors
