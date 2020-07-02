import React, { useState, useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { find, isUndefined, isNull, isEmpty } from "lodash"
import { Redirect } from "react-router-dom"

import ViewerLoading from "../../ViewerLoading"

import { getAbstracts, saveAbstractEval } from "../../actions/abstract_actions"

const Abstract = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const abstracts = useSelector((state) => state.abstracts, shallowEqual)
  const dispatch = useDispatch()

  const [evaluation, setEval] = useState(null)
  const [canVote, setCanVote] = useState(true)

  const [loaded, setLoaded] = useState(false)

  const abs = find(abstracts, (e) => e.abstractid === match.params.abstract_id)

  useEffect(() => {
    dispatch(getAbstracts(event.id, () => setLoaded(true)))
  }, [dispatch, event.id])

  if (loaded) {
    if (isEmpty(abstracts) || isUndefined(abs)) {
      return <Redirect to={`/${event.id}`} />
    }
  } else {
    return <ViewerLoading />
  }

  if (localStorage.getItem(`abstract-${abs.abstractid}`)) {
    setEval(localStorage.getItem(`abstract-${abs.abstractid}`))
    setCanVote(false)
  }

  const renderEvalStars = (value) => {
    return (
      <span
        className={`eval ${evaluation >= value ? "active" : ""}`}
        onClick={() => (canVote ? setEval(value) : undefined)}
      >
        <i className="fa fa-star"></i>
      </span>
    )
  }

  const handleSaveAbstractEval = () => {
    dispatch(
      saveAbstractEval(
        {
          abstract: abs.abstractid,
          user: -1, // FIX AFTER LOGIN
          score: evaluation
        },
        () => {
          setCanVote(false)
          localStorage.setItem(`abstract-${abs.abstractid}`, evaluation)
        }
      )
    )
  }

  return (
    <>
      <section id="viewer-abstract">
        <div className="over-mainarea">
          <div className="over-abstract">
            <h1 className="over-name">{abs.title}</h1>
          </div>
          <div className="over-section">
            <div className="over-subtitle" data-i18n="Autor(es)">
              Autor(es)
            </div>
            {abs.authors.map((author) => (
              <div className="abstract-author" key={author.name}>
                {author.name}
              </div>
            ))}
          </div>
          <div className="over-section over-paragraph">
            <div className="over-subtitle" data-i18n="Descrição">
              Descrição
            </div>
            {abs.description}
          </div>
        </div>
        {abs.file_url && (
          <>
            <br />
            <br />
            <div className="eval-section">
              <div className="over-subtitle">Avalie o material</div>
              {renderEvalStars(1)}
              {renderEvalStars(2)}
              {renderEvalStars(3)}
              {renderEvalStars(4)}
              {renderEvalStars(5)}
            </div>
            <br />
            <br />
          </>
        )}
        {abs.file_url && (
          <div className="over-footer">
            <a
              href={abs.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-viewer"
            >
              Acessar material
            </a>
          </div>
        )}
      </section>
      {!isNull(evaluation) && (
        <section id="viewer-eval" className="active">
          <div className="question-form">
            <div className="form-group">
              <span>Deseja enviar a avaliação de</span>
              <span className="eval-count"> {evaluation} </span>
              <span>estrela(s)</span>?
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-viewer btn-primary"
                onClick={handleSaveAbstractEval}
              >
                Enviar
              </button>
              <button
                className="btn btn-viewer btn-danger"
                onClick={() => setEval(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Abstract
