import React, { useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { Link } from "react-router-dom"

import { SHOW_TOP_MENU } from "../../actions/action_types"

const Main = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: SHOW_TOP_MENU })
  }, [dispatch])

  const setSectionUrl = ({ type, eventid, params }) => {
    switch (type) {
      case "PROGRAM":
        return `/${eventid}/program`
      case "SPEAKERS":
        return `/${eventid}/speakers`
      case "ABSTRACTS":
        return `/${eventid}/abstracts`
      case "EXHIBITORS":
        return `/${eventid}/exhibitors`
      case "SPONSORS":
        return `/${eventid}/sponsors`
      case "MAP":
        return `/${eventid}/map`
      case "LIVESTREAM":
        return `/${eventid}/lives`
      case "WEBVIEW":
        return `/${eventid}/${params.type}`

      default:
        return "#"
    }
  }

  return event.sections.map((section) => {
    return (
      <Link
        to={setSectionUrl(section)}
        key={section.sectionid}
        className="nounderline"
      >
        <li
          style={{
            backgroundImage: `url(${section.image})`,
            backgroundColor: "#000"
          }}
        >
          {section.name}
        </li>
      </Link>
    )
  })
}

export default Main
