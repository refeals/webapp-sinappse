import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Route } from "react-router-dom"

import Main from "./pages/main"
import Program from "./pages/program"
import Exhibitors from "./pages/exhibitors"
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
      <Route path="/:event_id" exact component={Main} />
      <Route path="/:event_id/program" exact component={Program} />
      <Route path="/:event_id/speakers" exact component={Program} />
      <Route path="/:event_id/abstracts" exact component={Program} />
      <Route path="/:event_id/exhibitors" exact component={Exhibitors} />
      <Route path="/:event_id/sponsors" exact component={Program} />
      <Route path="/:event_id/map" exact component={Program} />
      <Route path="/:event_id/webview" exact component={Program} />
      <Route path="/:event_id/lives" exact component={Livestream} />
    </>
  )
}

function mapStateToProps(state) {
  const { event } = state
  return { event }
}

const mapDispatchToProps = { getEvent }

export default connect(mapStateToProps, mapDispatchToProps)(RoutesEvent)
