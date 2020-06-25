import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Route } from "react-router-dom"

import Main from "./pages/main"
import Program from "./pages/program"
import Speakers from "./pages/speakers"
import Speaker from "./pages/speakers/show"
import Abstracts from "./pages/abstracts"
import Abstract from "./pages/abstracts/show"
import Exhibitors from "./pages/exhibitors"
import Exhibitor from "./pages/exhibitors/show"
import Sponsors from "./pages/sponsors"
import Sponsor from "./pages/sponsors/show"
import Map from "./pages/map"
import WebView from "./pages/webview"
import Livestream from "./pages/livestream"

import { getEvent } from "./actions/event_actions"

import setManifest from "./setManifest"

const RoutesEvent = ({ event, getEvent, match }) => {
  const [isLoading, setIsLoading] = useState(true)
  const event_id = match.params.event_id

  useEffect(() => {
    const fetchData = async () => {
      await getEvent(event_id, () => setIsLoading(false))
    }
    fetchData()
  }, [getEvent, event_id])

  if (isLoading) {
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
    <>
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
    </>
  )
}

function mapStateToProps(state) {
  const { event } = state
  return { event }
}

const mapDispatchToProps = { getEvent }

export default connect(mapStateToProps, mapDispatchToProps)(RoutesEvent)
