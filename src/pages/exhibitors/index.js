import React, { useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"

import { getExhibitors } from "../../actions/exhibitor_actions"

const Exhibitors = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const exhibitors = useSelector((state) => state.exhibitors, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isEmpty(exhibitors)) {
      dispatch(getExhibitors(match.params.event_id))
    }
  }, [dispatch, exhibitors, match.params.event_id])

  const renderExhibitorList = () => {
    return exhibitors.map((exh) => {
      return (
        <Link to={`/${event.id}/exhibitors/${exh.id}`} key={exh.id}>
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

export default Exhibitors
