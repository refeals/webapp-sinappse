import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import TopMenu from "../main/TopMenu"

import { getExhibitors } from "../../actions/exhibitor_actions"

const Exhibitors = ({ getExhibitors, event, exhibitors }) => {
  const [selectedExhibitor, setSelectedExhibitor] = useState(null)

  useEffect(() => {
    if (event.id) {
      const fetchData = async () => {
        await getExhibitors(event.id)
      }
      fetchData()
    }
  }, [getExhibitors, event.id])

  const renderExhibitorList = () => {
    return exhibitors.map((exh) => {
      return (
        <li
          key={exh.businessid}
          className="exhibitor-block"
          onClick={() => setSelectedExhibitor(exh)}
        >
          <div
            className="exhibitor-image"
            style={{ backgroundImage: `url(${exh.image_url})` }}
          ></div>
        </li>
      )
    })
  }

  const exh = selectedExhibitor

  if (exh) {
    return (
      <>
        <div
          className="topmenu"
          style={{
            backgroundColor: event["event-color"],
            color: event["text-color"]
          }}
        >
          <button
            className="va-home"
            onClick={() => setSelectedExhibitor(null)}
          >
            <i className="fa fa-home"></i>
          </button>
          <h1 className="event-name">{exh.name}</h1>
        </div>
        <section id="viewer-exhibitor">
          <div className="over-mainarea">
            <div className="over-exhibitor">
              <img className="over-image" src={exh.image_url} alt={exh.name} />
              <h1 className="over-name">{exh.name}</h1>
            </div>
          </div>
          {exh.presentation_url && (
            <div className="over-footer">
              <a
                href={exh.presentation_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-viewer"
              >
                Acessar Site
              </a>
            </div>
          )}
        </section>
      </>
    )
  }

  return (
    <>
      <TopMenu />
      <section id="viewer-exhibitors">
        <ul className="viewer-blocklist">{renderExhibitorList()}</ul>
      </section>
    </>
  )
}

function mapStateToProps(state) {
  const { event, exhibitors } = state
  return { event, exhibitors }
}

const mapDispatchToProps = { getExhibitors }

export default connect(mapStateToProps, mapDispatchToProps)(Exhibitors)
