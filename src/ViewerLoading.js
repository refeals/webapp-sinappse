import React from "react"
import { shallowEqual, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import logo_white from "./images/logo-white.png"

const ViewerLoading = ({ hideLoading }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const location = useLocation()

  const { pathname } = location
  const splittedPathname = pathname.split("/")
  const slug = splittedPathname[1]

  if (slug === event.slug)
    return (
      <>
        <div
          className="viewer-loading"
          style={{ backgroundColor: event.eventColor }}
        >
          {event.logo && <img src={event.logo} alt={event.eventName} />}
          <div className="loading-icon">
            {!hideLoading && <i className="fa fa-spinner fa-spin" />}
          </div>
        </div>
      </>
    )
  else
    return (
      <div className="viewer-loading" style={{ backgroundColor: "#00a157" }}>
        <p>Desenvolvido por Sinappse</p>
        <img src={logo_white} alt="Desenvolvido por Sinappse" />
        <div className="loading-icon">
          <i className="fa fa-spinner fa-spin" />
        </div>
      </div>
    )
}

export default ViewerLoading
