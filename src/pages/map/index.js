import React, { useState } from "react"
import { shallowEqual, useSelector } from "react-redux"

const Map = () => {
  const event = useSelector((state) => state.event, shallowEqual)

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
          src={event.map}
          alt="Mapa"
          onClick={() => toggleZoom()}
          style={mapStyle}
        />
      </div>
    </section>
  )
}

export default Map
