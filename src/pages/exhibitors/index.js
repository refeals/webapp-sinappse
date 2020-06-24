import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"

import { getExhibitors } from "../../actions/exhibitor_actions"

const Exhibitors = ({ getExhibitors, event, exhibitors }) => {
  useEffect(() => {
    if (event.id && isEmpty(exhibitors)) {
      const fetchData = async () => {
        await getExhibitors(event.id)
      }
      fetchData()
    }
  }, [getExhibitors, exhibitors, event.id])

  const renderExhibitorList = () => {
    return exhibitors.map((exh) => {
      return (
        <Link to={`/${event.id}/exhibitors/${exh.id}`} key={exh.businessid}>
          <li className="exhibitor-block">
            <div
              className="exhibitor-image"
              style={{ backgroundImage: `url(${exh.image_url})` }}
            ></div>
          </li>
        </Link>
      )
    })
  }

  return (
    <>
      <section id="viewer-exhibitors">
        <ul className="viewer-blocklist">{renderExhibitorList()}</ul>
      </section>
    </>
  )
}

function mapStateToProps(state) {
  const { event, exhibitors } = state
  return { event, exhibitors }
}

const mapDispatchToProps = { getExhibitors }

export default connect(mapStateToProps, mapDispatchToProps)(Exhibitors)
