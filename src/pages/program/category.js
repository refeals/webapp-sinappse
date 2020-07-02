import React, { useState, useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { isUndefined, map, sortBy } from "lodash"
import { Redirect, Link } from "react-router-dom"

import { getPrograms } from "../../actions/programs_actions"
import moment from "moment"

const Category = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const programs = useSelector((state) => state.programs, shallowEqual)
  const dispatch = useDispatch()

  const [selectedCat, setSelectedCat] = useState(2)

  const catArr = map(programs[match.params.category_id], (val, key) => {
    return {
      value: map(val, (v) => ({ ...v })),
      key
    }
  })
  const cat = sortBy(catArr, ["key"])
  // console.log(cat)

  useEffect(() => {
    // if (isEmpty(programs)) {
    dispatch(getPrograms(match.params.event_id))
    // }
  }, [dispatch, match])

  if (isUndefined(cat)) {
    return <Redirect to={`/${event.id}/program`} />
  }

  const renderTalks = (index) => {
    return cat[index].value.map((cat) => {
      return (
        <Link
          to="#"
          // to={`/${event.id}/program/${cat.categoryid}`}
          key={cat.talkID}
        >
          <ul className="viewer-talks">
            {/* {{props prop ~tab=key}} */}
            <li className="viewer-talk">
              <span className="talk-title">{cat.talkTitle}</span>
              <div className="footer row">
                <div className="talk-date col-xs-6">
                  <i className="fa fa-calendar"></i>{" "}
                  {moment(cat.talkStartTime.timestamp).format("DD/MM")}
                </div>
                <div className="talk-interval col-xs-6">
                  <i className="fa fa-clock"></i>{" "}
                  {moment(cat.talkStartTime.timestamp).format("hh:mm")} -{" "}
                  {moment(cat.talkFinishTime.timestamp).format("hh:mm")}
                </div>
              </div>
            </li>
            {/* {{/props}} */}
          </ul>
        </Link>
      )
    })
  }

  return (
    <section id="viewer-programacao">
      <ul className="viewer-program phonescreen">
        {cat.map((cat, index) => {
          return (
            <li
              className={`accordion-item ${
                selectedCat === index ? "active" : ""
              }`}
              onClick={() => setSelectedCat(index)}
              key={cat.key}
            >
              <label
                className="accordion-title"
                style={{ backgroundColor: event["event-color"] }}
              >
                {cat.key}
              </label>
              {renderTalks(index)}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Category
