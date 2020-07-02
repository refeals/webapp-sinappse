import React, { useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"

import { getPrograms } from "../../actions/programs_actions"

const Program = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  // const programs = useSelector((state) => state.programs, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPrograms(match.params.event_id))
  }, [dispatch, match.params.event_id])

  const renderProgramList = () => {
    if (isEmpty(event["categories-list"])) {
      return (
        <li>
          <i className="fa fa-spinner fa-spin"></i>
        </li>
      )
    }

    return event["categories-list"].map((cat) => {
      return (
        <Link
          to={`/${event.id}/program/${cat.categoryid}`}
          key={cat.categoryid}
        >
          <li
            className={`category-block size-${cat.size}`}
            style={{ backgroundImage: `url(${cat.image})` }}
          >
            {cat.name}
          </li>
        </Link>
      )
    })
  }

  return (
    <section id="viewer-programacao">
      <ul className="viewer-program phonescreen">{renderProgramList()}</ul>
    </section>
  )
}

export default Program
