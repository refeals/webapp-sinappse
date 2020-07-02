import React, { useEffect, useState } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { find, isUndefined, isEmpty } from "lodash"
import { Redirect } from "react-router-dom"

import ViewerLoading from "../../ViewerLoading"

import { getExhibitors } from "../../actions/exhibitor_actions"

const Exhibitor = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const exhibitors = useSelector((state) => state.exhibitors, shallowEqual)
  const dispatch = useDispatch()

  const [loaded, setLoaded] = useState(false)

  const exh = find(exhibitors, (e) => e.id === match.params.exhibitor_id)

  useEffect(() => {
    dispatch(getExhibitors(match.params.event_id, () => setLoaded(true)))
  }, [dispatch, match.params.event_id])

  if (loaded) {
    if (isEmpty(exhibitors) || isUndefined(exh)) {
      return <Redirect to={`/${event.id}`} />
    }
  } else {
    return <ViewerLoading />
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

export default Exhibitor
