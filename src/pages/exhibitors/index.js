import React, { useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { Link } from "react-router-dom"

import { getExhibitors } from "../../actions/exhibitor_actions"

const Exhibitors = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const exhibitors = useSelector((state) => state.exhibitors, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getExhibitors(event.id))
  }, [dispatch, event.id])

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
