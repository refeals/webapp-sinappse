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
import Map from "./pages/map"
import Livestream from "./pages/livestream"

import { getEvent } from "./actions/event_actions"

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

  // if (isLoading && !event.id) {
  //   return <Redirect to="/" />
  // }

  const hide = match.path === "/:event_id" && match.isExact ? "hide" : ""

  return (
    <>
      <ul className="viewer-menu">
        <Route exact path="/:event_id" component={Main} />
      </ul>
      <div className={`open-section ${hide}`}>
        <Route exact path="/:event_id/program" component={Program} />
        <Route exact path="/:event_id/speakers" component={Speakers} />
        <Route
          exact
          path="/:event_id/speakers/:speaker_id"
          component={Speaker}
        />
        <Route exact path="/:event_id/abstracts" component={Abstracts} />
        <Route
          exact
          path="/:event_id/abstracts/:abstract_id"
          component={Abstract}
        />
        <Route exact path="/:event_id/exhibitors" component={Exhibitors} />
        <Route
          exact
          path="/:event_id/exhibitors/:exhibitor_id"
          component={Exhibitor}
        />
        <Route exact path="/:event_id/sponsors" component={Program} />
        <Route exact path="/:event_id/map" component={Map} />
        <Route exact path="/:event_id/webview" component={Program} />
        <Route exact path="/:event_id/lives" component={Livestream} />
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
