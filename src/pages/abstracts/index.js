import React from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Abstracts = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const abstracts = useSelector((state) => state.abstracts, shallowEqual)

  const renderAbstracts = () => {
    return abstracts.map((abs) => {
      return (
        <Link
          key={abs.abstractid}
          to={`/${event.slug}/abstracts/${abs.abstractid}`}
        >
          <li className="abstract-block">
            <div className="abstract-title">{abs.title}</div>
            <div className="abstract-authors">
              Autor(es):
              {abs.authors.map((author) => (
                <span className="abstract-author" key={author.name}>
                  {author.name}
                </span>
              ))}
            </div>
          </li>
        </Link>
      )
    })
  }

  return (
    <section id="viewer-abstracts">
      <ul className="viewer-blocklist">{renderAbstracts()}</ul>
    </section>
  )
}

export default Abstracts
