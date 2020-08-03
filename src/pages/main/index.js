import { isUndefined } from "lodash"
import React from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ViewerLoading from "../../ViewerLoading"

const Main = () => {
  const event = useSelector((state) => state.event, shallowEqual)

  const setSectionUrl = ({ type, params }) => {
    switch (type) {
      case "PROGRAM":
        return `/${event.slug}/program`
      case "SPEAKERS":
        return `/${event.slug}/speakers`
      case "ABSTRACTS":
        return `/${event.slug}/abstracts`
      case "EXHIBITORS":
        return `/${event.slug}/exhibitors`
      case "SPONSORS":
        return `/${event.slug}/sponsors`
      case "MAP":
        return `/${event.slug}/map`
      case "LIVESTREAM":
        return `/${event.slug}/lives`
      case "WEBVIEW":
        return `/${event.slug}/${params.type}`

      default:
        return "#"
    }
  }

  if (isUndefined(event.id)) {
    return <ViewerLoading />
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
