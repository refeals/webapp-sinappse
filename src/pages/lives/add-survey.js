import React, { useState } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { compact, isEmpty, uniqueId, fromPairs } from "lodash"
import { toast } from "react-toastify"

import { db } from "../../firebase"

function AddSurvey({ fbRefStr, closeModal }) {
  const streamer = useSelector((state) => state.streamer, shallowEqual)
  const [title, setTitle] = useState("")
  const [answersRaw, setAnswers] = useState(["", "", "", ""])
  const answers = compact(answersRaw)

  const createSurvey = (e) => {
    e.preventDefault()

    if (isEmpty(title)) {
      return toast("Por favor, adicione um título!")
    }
    if (answers.length < 2) {
      return toast("Você deve adicionar pelo menos duas respostas!")
    }

    const survey = {
      title,
      answers: fromPairs(
        answers.map((ans) => [uniqueId("answer_"), { title: ans }])
      ),
      active: false,
      enabled: false,
      show_results: false,
      streamer_id: streamer.id
    }
    db.ref(`${fbRefStr}/surveys`).push(survey)

    closeModal()
  }

  const setAnswer = (e, index) => {
    const newAnswers = answersRaw.map((ans, ind) =>
      ind === index ? e.target.value : ans
    )
    setAnswers(newAnswers)
  }

  return (
    <form className="add-survey-form" onSubmit={createSurvey}>
      <div className="form-group">
        <label className="survey-label">Título da enquete *</label>
        <input
          type="text"
          className="form-control s-add-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="s-add-answers">
        <p className="text">Você deve adicionar pelo menos duas respostas</p>
        <p className="text">Respostas em branco não serão consideradas!</p>

        <button
          className="add-question"
          onClick={() => setAnswers([...answersRaw, ""])}
          type="button"
        >
          <i className="fas fa-plus"></i>
          <span>Adicionar Resposta</span>
        </button>

        <div className="form-group">
          <label className="survey-label">Perguntas</label>
          {answersRaw.map((ans, index) => (
            <input
              type="text"
              className="form-control s-add-question"
              key={index}
              value={ans}
              onChange={(e) => setAnswer(e, index)}
              placeholder={`Resposta ${index + 1} ${index < 2 ? "*" : ""}`}
            />
          ))}
        </div>

        <div className="form-group">
          <button className="submit-survey" type="submit">
            <i className="fas fa-chart-pie" />
            <span>Criar Enquete</span>
          </button>
          <button className="close-modal" type="submit">
            <i className="fas fa-times" />
            <span>Cancelar</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddSurvey
