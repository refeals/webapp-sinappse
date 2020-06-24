import React, { useEffect } from "react"
import { connect } from "react-redux"
import { isEmpty } from "lodash"

import { getAbstracts } from "../../actions/abstract_actions"
import { Link } from "react-router-dom"

const Abstracts = ({ event, abstracts, getAbstracts }) => {
  useEffect(() => {
    if (event.id && isEmpty(abstracts)) {
      const fetchData = async () => {
        await getAbstracts(event.id)
      }
      fetchData()
    }
  }, [getAbstracts, abstracts, event.id])

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

function mapStateToProps(state) {
  const { event, abstracts } = state
  return { event, abstracts }
}

const mapDispatchToProps = { getAbstracts }

export default connect(mapStateToProps, mapDispatchToProps)(Abstracts)
