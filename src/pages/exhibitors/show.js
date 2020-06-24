import React, { useEffect } from "react"
import { connect } from "react-redux"
import { isEmpty, find, isUndefined } from "lodash"
import { Redirect } from "react-router-dom"

import { getExhibitors } from "../../actions/exhibitor_actions"

const Exhibitor = ({ event, getExhibitors, exhibitors, match }) => {
  const exh = find(exhibitors, (e) => e.id === match.params.exhibitor_id)

  useEffect(() => {
    if (event.id && isEmpty(exhibitors)) {
      const fetchData = async () => {
        await getExhibitors(event.id)
      }
      fetchData()
    }
  }, [getExhibitors, event.id])

  if (isUndefined(exh)) {
    return <Redirect to={`/${event.id}/exhibitors`} />
  }

  return (
    <>
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

function mapStateToProps(state) {
  const { event, exhibitors } = state
  return { event, exhibitors }
}

const mapDispatchToProps = { getExhibitors }

export default connect(mapStateToProps, mapDispatchToProps)(Exhibitor)
