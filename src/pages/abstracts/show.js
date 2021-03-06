import { find, isEmpty, isNull, isUndefined } from "lodash"
import React, { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { toast } from "react-toastify"
import { saveAbstractEval } from "../../actions/abstract_actions"

const Abstract = ({ match }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const user = useSelector((state) => state.user, shallowEqual)
  const abstracts = useSelector((state) => state.abstracts, shallowEqual)
  const dispatch = useDispatch()

  const [evaluation, setEval] = useState(null)
  const [canVote, setCanVote] = useState(true)

  const abs = find(abstracts, (e) => e.abstractid === match.params.abstract_id)

  useEffect(() => {
    if (localStorage.getItem(`abstract-${abs.abstractid}`)) {
      setEval(localStorage.getItem(`abstract-${abs.abstractid}`))
      setCanVote(false)
    }
  }, [abs.abstractid])

  if (isUndefined(abs)) {
    if (isEmpty(abstracts)) {
      return <Redirect to={`/${event.slug}`} />
    } else {
      return <Redirect to={`/${event.slug}/abstracts`} />
    }
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
      saveAbstractEval({
        data: {
          abstract_id: abs.abstractid,
          user_id: user.id,
          score: evaluation,
        },
        onSuccess: (msg) => {
          setCanVote(false)
          localStorage.setItem(`abstract-${abs.abstractid}`, evaluation)
          toast(msg)
        },
        onError: (msg) => toast(msg),
      }),
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
            <div className="abstract-eval">
              <div className="eval-section">
                <div className="over-subtitle">Avalie o material</div>
                {renderEvalStars(1)}
                {renderEvalStars(2)}
                {renderEvalStars(3)}
                {renderEvalStars(4)}
                {renderEvalStars(5)}
              </div>
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
      {!isNull(evaluation) && canVote && (
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
