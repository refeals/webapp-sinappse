import React, { useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"

import { getAbstracts } from "../../actions/abstract_actions"

const Abstracts = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const abstracts = useSelector((state) => state.abstracts, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isEmpty(abstracts)) {
      dispatch(getAbstracts(match.params.event_id))
    }
  }, [dispatch, abstracts, match.params.event_id])

  const renderAbstracts = () => {
    return abstracts.map((abs) => {
      return (
        <Link
          key={abs.abstractid}
          to={`/${event.id}/abstracts/${abs.abstractid}`}
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
