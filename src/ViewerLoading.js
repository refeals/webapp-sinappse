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
        <img src={event.logo} alt="Event Logo" />
        <div className="loading-icon">
          {!hideLoading && <i className="fa fa-spinner fa-spin" />}
        </div>
      </div>
    </>
  )
}

export default ViewerLoading
