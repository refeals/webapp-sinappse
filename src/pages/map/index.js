import React from "react"
import { MapInteractionCSS } from "react-map-interaction"
import { shallowEqual, useSelector } from "react-redux"

const Map = () => {
  const event = useSelector((state) => state.event, shallowEqual)

  return (
    <section id="viewer-map">
      <MapInteractionCSS>
        <img src={event.map} alt="Mapa" onClick={() => console.log("asdasd")} />
      </MapInteractionCSS>
    </section>
  )
}

export default Map
