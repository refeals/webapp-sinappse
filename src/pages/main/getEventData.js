import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { getEvent } from "../../actions/event_actions"

const GetEventData = ({ event, getEvent, match }) => {
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

  if (!event.id) {
    return <Redirect to="/" />
  }

  return <></>
}

function mapStateToProps(state) {
  const { event } = state
  return { event }
}

const mapDispatchToProps = { getEvent }

export default connect(mapStateToProps, mapDispatchToProps)(GetEventData)
