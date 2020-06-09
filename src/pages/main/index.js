import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import TopMenu from "./TopMenu"

const Main = ({ event }) => {
  const renderSections = () => {
    return event.sections.map((section) => {
      return (
        <Link
          to={`/${event.id}/lives`}
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

  return (
    <>
      <TopMenu />
      <div className="mainarea">
        <ul className="viewer-menu">{renderSections()}</ul>
        <div className="open-section hide"></div>
      </div>
    </>
  )
}

function mapStateToProps(state) {
  const { event } = state
  return { event }
}

export default connect(mapStateToProps)(Main)
