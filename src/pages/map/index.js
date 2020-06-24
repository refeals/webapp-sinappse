import React, { useState } from "react"
import { connect } from "react-redux"

const Map = ({ event: { map } }) => {
  const [hasZoom, setHasZoom] = useState(false)

  const toggleZoom = () => {
    setHasZoom(!hasZoom)
  }

  const mapStyle = {
    width: hasZoom ? "100%" : "auto"
  }

  return (
    <section id="viewer-map">
      <div id="vmap">
        <img
          src={map.file}
          alt="Mapa"
          onClick={() => toggleZoom()}
          style={mapStyle}
        />
      </div>
    </section>
  )
}

function mapStateToProps(state) {
  const { event } = state
  return { event }
}

export default connect(mapStateToProps)(Map)
