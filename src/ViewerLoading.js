import React from "react"
import logo_white from "./images/logo-white.png"

const ViewerLoading = ({ hideLoading }) => {
  return (
    <>
      <div className="viewer-loading">
        <img src={logo_white} alt="Event Logo" />
        <div className="loading-icon">
          {!hideLoading && <i className="fa fa-spinner fa-spin" />}
        </div>
      </div>
    </>
  )
}

export default ViewerLoading
