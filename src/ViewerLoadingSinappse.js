import React from "react"
import logo_white from "./images/logo-white.png"

const ViewerLoadingSinappse = () => {
  return (
    <div className="viewer-loading">
      <img src={logo_white} alt="Desenvolvido por Sinappse" />
      <div className="loading-icon">
        <i className="fa fa-spinner fa-spin" />
      </div>
    </div>
  )
}

export default ViewerLoadingSinappse
