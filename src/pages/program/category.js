import { isEmpty, map, sortBy } from "lodash"
import moment from "moment"
import React, { useState } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Link, Redirect } from "react-router-dom"

const Category = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const programs = useSelector((state) => state.programs, shallowEqual)

  const [selectedCat, setSelectedCat] = useState(0)

  const catArr = map(programs[match.params.category_id], (val, key) => {
    return {
      value: map(val, (v) => ({ ...v })),
      key
    }
  })
  const cat = sortBy(catArr, ["key"])

  if (isEmpty(cat)) {
    if (isEmpty(programs)) {
      return <Redirect to={`/${event.slug}`} />
    } else {
      return <Redirect to={`/${event.slug}/program`} />
    }
  }

  const renderTalks = (index) => {
    return cat[index].value.map((c) => {
      return (
        <Link
          to={`/${event.slug}/program/${c.talkCategory}/${c.talkID}`}
          key={c.talkID}
          className="nounderline"
        >
          <ul className="viewer-talks">
            <li className="viewer-talk">
              <span className="talk-title">{c.talkTitle}</span>
              <div className="footer row">
                <div className="talk-date col-xs-6">
                  <i className="fa fa-calendar"></i>{" "}
                  {moment(c.talkStartTime.timestamp).format("DD/MM")}
                </div>
                <div className="talk-interval col-xs-6">
                  <i className="fa fa-clock"></i>{" "}
                  {moment(c.talkStartTime.timestamp).format("hh:mm")} -{" "}
                  {moment(c.talkFinishTime.timestamp).format("hh:mm")}
                </div>
              </div>
            </li>
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
                style={{ backgroundColor: event.eventColor }}
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
