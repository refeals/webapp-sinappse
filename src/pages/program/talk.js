import React, { useEffect, useState } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { isUndefined, map, find, flatten, isNull } from "lodash"

import { getPrograms, talkVote, askSend } from "../../actions/programs_actions"
import { toast } from "react-toastify"

const Talk = ({ match }) => {
  // const event = useSelector((state) => state.event, shallowEqual)
  const programs = useSelector((state) => state.programs, shallowEqual)
  const dispatch = useDispatch()

  const [evaluation, setEval] = useState(null)
  const [canVote, setCanVote] = useState(true)

  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [name, setName] = useState("")
  const [question, setQuestion] = useState("")

  const catArr = map(programs[match.params.category_id], (val, key) => {
    return map(val, (v) => ({ ...v }))
  })
  const catFlatten = flatten(catArr)
  const talk = find(catFlatten, ["talkID", match.params.talk_id])

  useEffect(() => {
    dispatch(getPrograms(match.params.event_id))
  }, [dispatch, match])

  if (isUndefined(talk)) {
    return <div style={{ color: "black" }}>DASDASDSA</div>
    // return <Redirect to={`/${event.id}/program`} />
  }

  if (localStorage.getItem(`talk-${talk.talkID}`)) {
    setEval(localStorage.getItem(`talk-${talk.talkID}`))
    setCanVote(false)
  }

  const handleSaveEval = () => {
    dispatch(
      talkVote(
        {
          talk: talk.talkID,
          user: -1, // FIX AFTER LOGIN
          score: evaluation
        },
        () => {
          setCanVote(false)
          localStorage.setItem(`talk-${talk.talkID}`, evaluation)
          toast("Pergunta enviada")
        }
      )
    )
  }

  const handleSendQuestion = () => {
    if (name.length < 5) {
      toast("Seu nome deve ter ao menos 5 caracteres")
      return
    }
    if (question.length < 10) {
      toast("A pergunta deve ter ao menos 10 caracteres")
      return
    }
    dispatch(
      askSend(
        {
          talk: talk.talkID,
          name,
          question
        },
        () => {
          setShowQuestionModal(false)
        }
      )
    )
  }

  const renderEvalStars = (value) => {
    return (
      <span
        className={`eval ${evaluation >= value ? "active" : ""}`}
        onClick={() => {
          if (canVote) {
            setEval(value)
            setShowQuestionModal(false)
          }
        }}
      >
        <i className="fa fa-star"></i>
      </span>
    )
  }

  return (
    <>
      <section id="viewer-talk">
        <div className="talkarea">
          <img
            className="talk-image"
            src={talk.talkImageUrl}
            alt={talk.talkTitle}
          />
          <h1 className="talk-name">{talk.talkTitle}</h1>
          <div className="talk-datetime">
            <div className="talk-date"></div>
            <div className="talk-time"></div>
          </div>
          <div className="talk-description">{talk.talkDescription}</div>
          <div className="talk-ask">
            <button
              className="btn btn-viewer"
              onClick={() => {
                setShowQuestionModal(true)
                setEval(null)
              }}
            >
              Faça uma pergunta ao palestrante
            </button>
          </div>
          <div className="talk-eval">
            <div className="eval-title">Avalie</div>
            {renderEvalStars(1)}
            {renderEvalStars(2)}
            {renderEvalStars(3)}
            {renderEvalStars(4)}
            {renderEvalStars(5)}
          </div>
        </div>
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
                onClick={handleSaveEval}
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
      {showQuestionModal && (
        <section id="viewer-asker" className="active">
          <div className="question-form">
            <div className="form-group">
              <label>Seu nome</label>
              <input
                type="text"
                className="form-control"
                id="asker-name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label data-i18n="Sua pergunta">Sua pergunta</label>
              <textarea
                className="form-control"
                id="asker-question"
                placeholder="Sua pergunta"
                rows="6"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-viewer btn-primary"
                id="asker-send"
                onClick={handleSendQuestion}
              >
                Enviar
              </button>
              <button
                className="asker-cancel btn btn-viewer btn-danger"
                onClick={() => setShowQuestionModal(false)}
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

export default Talk
