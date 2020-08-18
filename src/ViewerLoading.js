import React from "react"
import { shallowEqual, useSelector } from "react-redux"

const ViewerLoading = ({ hideLoading }) => {
  const event = useSelector((state) => state.event, shallowEqual)

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
}

export default ViewerLoading
