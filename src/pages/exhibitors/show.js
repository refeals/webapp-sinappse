import { find, isEmpty, isUndefined } from "lodash"
import React from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

const Exhibitor = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const exhibitors = useSelector((state) => state.exhibitors, shallowEqual)

  const exh = find(exhibitors, (e) => e.id === match.params.exhibitor_id)

  if (isUndefined(exh)) {
    if (isEmpty(exhibitors)) {
      return <Redirect to={`/${event.slug}`} />
    } else {
      return <Redirect to={`/${event.slug}/exhibitors`} />
    }
  }

  return (
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
  )
}

export default Exhibitor
