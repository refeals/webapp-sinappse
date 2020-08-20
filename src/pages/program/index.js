import { isEmpty } from "lodash"
import React from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Link, Redirect } from "react-router-dom"

const Program = () => {
  const event = useSelector((state) => state.event, shallowEqual)

  if (event.categoriesList.length === 1) {
    const cat = event.categoriesList[0]
    return <Redirect to={`/${event.slug}/program/${cat.categoryid}`} />
  }

  const renderProgramList = () => {
    if (isEmpty(event.categoriesList)) {
      return (
        <li>
          <i className="fa fa-spinner fa-spin"></i>
        </li>
      )
    }

    return event.categoriesList.map((cat) => {
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
