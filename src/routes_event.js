import React, { useEffect, lazy, Suspense } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { Route } from "react-router-dom"

import { getEvent } from "./actions/event_actions"

import setManifest from "./setManifest"

const Main = lazy(() => import("./pages/main"))
const Program = lazy(() => import("./pages/program"))
const Speakers = lazy(() => import("./pages/speakers"))
const Speaker = lazy(() => import("./pages/speakers/show"))
const Abstracts = lazy(() => import("./pages/abstracts"))
const Abstract = lazy(() => import("./pages/abstracts/show"))
const Exhibitors = lazy(() => import("./pages/exhibitors"))
const Exhibitor = lazy(() => import("./pages/exhibitors/show"))
const Sponsors = lazy(() => import("./pages/sponsors"))
const Sponsor = lazy(() => import("./pages/sponsors/show"))
const Map = lazy(() => import("./pages/map"))
const WebView = lazy(() => import("./pages/webview"))
const Livestream = lazy(() => import("./pages/livestream"))

const RoutesEvent = ({ match }) => {
  const dispatch = useDispatch()
  const event = useSelector((state) => state.event, shallowEqual)

  useEffect(() => {
    dispatch(getEvent(match.params.event_id))
  }, [dispatch, match])

  if (!event.id) {
    return <div className="viewer-loading"></div>
  }

  setManifest(event)

  // if (isLoading && !event.id) {
  //   return <Redirect to="/" />
  // }

  const hide = match.path === "/:event_id" && match.isExact ? "hide" : ""

  const sections = event.sections
    .filter((s) => s.type !== "WEBVIEW")
    .map((s) => s.type)
  const sections_webview = event.sections
    .filter((s) => s.type === "WEBVIEW")
    .map((s) => ({ type: s.type, params: s.params }))

  return (
    <Suspense fallback={<div className="viewer-loading"></div>}>
      <ul className="viewer-menu">
        <Route exact path="/:event_id" component={Main} />
      </ul>
      <div className={`open-section ${hide}`}>
        {sections.includes("PROGRAM") && (
          <>
            <Route exact path="/:event_id/program" component={Program} />
          </>
        )}
        {sections.includes("SPEAKERS") && (
          <>
            <Route exact path="/:event_id/speakers" component={Speakers} />
            <Route
              exact
              path="/:event_id/speakers/:speaker_id"
              component={Speaker}
            />
          </>
        )}
        {sections.includes("ABSTRACTS") && (
          <>
            <Route exact path="/:event_id/abstracts" component={Abstracts} />
            <Route
              exact
              path="/:event_id/abstracts/:abstract_id"
              component={Abstract}
            />
          </>
        )}
        {sections.includes("EXHIBITORS") && (
          <>
            <Route exact path="/:event_id/exhibitors" component={Exhibitors} />
            <Route
              exact
              path="/:event_id/exhibitors/:exhibitor_id"
              component={Exhibitor}
            />
          </>
        )}
        {sections.includes("SPONSORS") && (
          <>
            <Route exact path="/:event_id/sponsors" component={Sponsors} />
            <Route
              exact
              path="/:event_id/sponsors/:sponsor_id"
              component={Sponsor}
            />
          </>
        )}
        {sections.includes("MAP") && (
          <Route exact path="/:event_id/map" component={Map} />
        )}
        {sections.includes("LIVES") && (
          <Route exact path="/:event_id/lives" component={Livestream} />
        )}

        {sections_webview.map((s) => {
          return (
            <Route
              exact
              path={`/:event_id/${s.params.type}`}
              render={(props) => <WebView {...props} {...s.params} />}
              key={s.params.type}
            />
          )
        })}
      </div>
    </Suspense>
  )
}

export default RoutesEvent
