import React, { useEffect, useState } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { isNull, toPairs } from "lodash"

import { db } from "../../firebase"

function LivestreamAds({ live }) {
  const event = useSelector((state) => state.event, shallowEqual)

  const [ad, setAd] = useState(null)
  const [hideAd, setHideAd] = useState(false)

  const adsRefStr = `event/${event.id}/livestream/${live.id}/ads`

  useEffect(() => {
    db.ref(adsRefStr)
      .orderByChild("active")
      .equalTo(true)
      .limitToLast(1)
      .on("value", (snapshot) => {
        const val = snapshot.val()
        if (!isNull(val)) {
          setAd(toPairs(val)[0][1])
          setHideAd(false)
        } else {
          setHideAd(null)
        }
      })
  }, [adsRefStr])

  const handleCloseAd = (e) => {
    e.preventDefault()
    setHideAd(true)
  }

  if (isNull(ad)) {
    return <></>
  }

  if (hideAd) {
    return <></>
  }

  return (
    <a className={`ad ${ad.position}`} href={ad.redirect_to || "#"}>
      <img src={ad.image_url} alt="Ad" />
      <button className="text" onClick={handleCloseAd}>
        Publicidade
        <i className="fas fa-times" style={{ color: event.eventColor }} />
      </button>
    </a>
  )
}

export default LivestreamAds
