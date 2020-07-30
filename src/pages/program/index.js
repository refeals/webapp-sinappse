import { isEmpty } from "lodash"
import React from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Program = () => {
  const event = useSelector((state) => state.event, shallowEqual)

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
          to={`/${event.slug}/program/${cat.categoryid}`}
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
