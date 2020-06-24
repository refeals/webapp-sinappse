import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Route } from "react-router-dom"

import Main from "./pages/main"
import Program from "./pages/program"
import Exhibitors from "./pages/exhibitors"
import Exhibitor from "./pages/exhibitors/show"
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

  return (
    <>
      <Route exact path="/:event_id" component={Main} />
      <Route exact path="/:event_id/program" component={Program} />
      <Route exact path="/:event_id/speakers" component={Program} />
      <Route exact path="/:event_id/abstracts" component={Program} />
      <Route exact path="/:event_id/exhibitors" component={Exhibitors} />
      <Route
        exact
        path="/:event_id/exhibitors/:exhibitor_id"
        component={Exhibitor}
      />
      <Route exact path="/:event_id/sponsors" component={Program} />
      <Route exact path="/:event_id/map" component={Program} />
      <Route exact path="/:event_id/webview" component={Program} />
      <Route exact path="/:event_id/lives" component={Livestream} />
    </>
  )
}

function mapStateToProps(state) {
  const { event } = state
  return { event }
}

const mapDispatchToProps = { getEvent }

export default connect(mapStateToProps, mapDispatchToProps)(RoutesEvent)
