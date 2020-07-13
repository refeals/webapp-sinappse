import React, { useEffect, useState } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { toPairs, size, round } from "lodash"

import { db } from "../../firebase"

function Surveys({ fbRefStr }) {
  const streamer = useSelector((state) => state.streamer, shallowEqual)
  const [surveys, setSurveys] = useState([])

  // get surveys
  useEffect(() => {
    db.ref(`${fbRefStr}/surveys`).on("value", (snapshot) => {
      const val = snapshot.val()
      const valArr = toPairs(val)
      setSurveys(
        valArr
          .filter((s) => s[1].streamer_id === streamer.id)
          .map((s) => {
            return {
              ...s[1],
              id: s[0]
            }
          })
      )
    })
  }, [fbRefStr, streamer.id])

  return surveys.map((s) => (
    <Survey survey={s} key={s.id} fbRefStr={fbRefStr} />
  ))
}

function Survey({ survey, fbRefStr }) {
  const answers = toPairs(survey.answers)
  const totalVotes = answers.reduce((acc, el) => acc + size(el[1].user_ids), 0)

  const renderAnswers = () =>
    answers.map(([key, ans]) => {
      return (
        <p className="s-ans-item" key={key}>
          <span className="s-percentage">
            {totalVotes ? round((size(ans.user_ids) * 100) / totalVotes) : 0}%
          </span>
          <span className="s-answer-title">{ans.title}</span>
        </p>
      )
    })

  return (
    <div className="survey">
      <div className="s-icon">
        <i className="fas fa-chart-pie" />
      </div>
      <div className="s-content">
        <p className="s-title">{survey.title}</p>
        <div className="s-ans-container">{renderAnswers()}</div>
      </div>
      <div className="s-buttons">
        <button className="s-button finalize">Finalizar Enquete</button>
        <button className="s-button show-results">Exibir Resultados</button>
        <button className="s-button start">Iniciar Enquete</button>
      </div>
    </div>
  )
}

export default Surveys
