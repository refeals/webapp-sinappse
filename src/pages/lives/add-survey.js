import { compact, fromPairs, isEmpty, uniqueId } from "lodash"
import React, { useState } from "react"
import { shallowEqual, useSelector } from "react-redux"
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
      streamer_id: streamer.id,
      color: generateRandomColor()
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

  const generateRandomColor = () =>
    `#${("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6)}`

  return (
    <form className="add-survey-form" onSubmit={createSurvey}>
      <div className="form-group">
        <label className="survey-label">Título da enquete *</label>
        <input
          type="text"
          className="form-control s-add-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />
      </div>

      <div className="s-add-answers">
        <p className="text">Você deve adicionar pelo menos duas respostas</p>
        <p className="text">Respostas em branco não serão consideradas!</p>

        <button
          className="add-question btn btn-block btn-primary"
          onClick={() => setAnswers([...answersRaw, ""])}
          type="button"
        >
          <i className="fas fa-plus"></i>
          <span>Adicionar Resposta</span>
        </button>

        <div className="form-group">
          <label className="survey-label">Respostas</label>
          {answersRaw.map((ans, index) => (
            <div className="s-add-question" key={index}>
              <input
                type="text"
                className="form-control"
                value={ans}
                onChange={(e) => setAnswer(e, index)}
                placeholder={`Resposta ${index + 1} ${index < 2 ? "*" : ""}`}
              />
              <button
                type="button"
                onClick={() =>
                  setAnswers(
                    answersRaw.filter((ans, ind) => {
                      return ind !== index
                    })
                  )
                }
              >
                <i className="fas fa-times" />
              </button>
            </div>
          ))}
        </div>

        <div className="form-group">
          <div className="s-add-buttons">
            <button className="submit-survey btn btn-success" type="submit">
              <i className="fas fa-chart-pie" />
              <span>Criar Enquete</span>
            </button>
            <button className="close-modal btn btn-danger" onClick={closeModal}>
              <i className="fas fa-times" />
              <span>Cancelar</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddSurvey
