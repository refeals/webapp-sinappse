import React, { useEffect, useState } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { toPairs, size, round, fromPairs, omit, isUndefined } from "lodash"
import { toast } from "react-toastify"

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
          .filter(([id, survey]) => survey.streamer_id === streamer.id)
          .map(([id, survey]) => {
            return {
              ...survey,
              id
            }
          })
      )
    })
  }, [fbRefStr, streamer.id])

  const activateSurvey = (survey_id) => {
    const updatedSurveys = fromPairs(
      surveys.map((s) => [
        s.id,
        {
          ...omit(s, "id"),
          active: s.id === survey_id
        }
      ])
    )

    db.ref(`${fbRefStr}/surveys`)
      .set(updatedSurveys)
      .then(() => toast("Enquete ativada"))
  }

  const updateSurvey = (survey_id, attr, value) => {
    if (isUndefined(survey_id) || isUndefined(attr) || isUndefined(value)) {
      return
    }

    db.ref(`${fbRefStr}/surveys/${survey_id}/${attr}`)
      .set(value)
      .then(() => {
        if (attr === "enabled" && value === true) {
          return toast("Enquete aberta")
        }
        if (attr === "enabled" && value === false) {
          return toast("Enquete finalizada")
        }
        if (attr === "show_results" && value === true) {
          return toast("Resultados de enquete disponíveis")
        }
        if (attr === "show_results" && value === false) {
          return toast("Resultados de enquete ocultados")
        }
      })
  }

  return surveys.map((s) => (
    <Survey
      survey={s}
      key={s.id}
      activateSurvey={activateSurvey}
      updateSurvey={updateSurvey}
    />
  ))
}

function Survey({ survey, activateSurvey, updateSurvey }) {
  const answers = toPairs(survey.answers)
  const totalVotes = answers.reduce((acc, el) => acc + size(el[1].user_ids), 0)

  const renderAnswers = () =>
    answers.map(([key, ans]) => (
      <div className="s-ans-item" key={key}>
        <div className="s-percentage">
          {totalVotes ? round((size(ans.user_ids) * 100) / totalVotes) : 0}%
        </div>
        <div className="s-answer-title">{ans.title}</div>
      </div>
    ))

  const renderButtons = () => {
    if (!survey.active) {
      return (
        <button
          className="s-button start"
          onClick={() => activateSurvey(survey.id)}
        >
          Iniciar Enquete
        </button>
      )
    }

    let buttons = []

    if (survey.enabled) {
      buttons = [
        ...buttons,
        <button
          className="s-button finalize"
          onClick={() => updateSurvey(survey.id, "enabled", false)}
          title="Clique para não permitir que os usuários respondam"
          key="finalize"
        >
          Finalizar Enquete
        </button>
      ]
    } else {
      buttons = [
        ...buttons,
        <button
          className="s-button finalize"
          onClick={() => updateSurvey(survey.id, "enabled", true)}
          title="Clique para permitir que os usuários respondam"
          key="finalize"
        >
          Abrir Enquete
        </button>
      ]
    }

    if (survey.show_results) {
      buttons = [
        ...buttons,
        <button
          className="s-button show-results"
          onClick={() => updateSurvey(survey.id, "show_results", false)}
          title="Clique para não permitir que os usuários vejam o resultado da enquete"
          key="show-results"
        >
          Ocultar Resultados
        </button>
      ]
    } else {
      buttons = [
        ...buttons,
        <button
          className="s-button show-results"
          onClick={() => updateSurvey(survey.id, "show_results", true)}
          title="Clique para permitir que os usuários vejam o resultado da enquete"
          key="show-results"
        >
          Exibir Resultados
        </button>
      ]
    }

    return buttons
  }

  const renderSurveyStatus = () => {
    if (!survey.active) {
      return <div className="status inactive">Inativa</div>
    }

    let msgs = [
      <div className="status active" key="active">
        Ativa
      </div>
    ]

    if (survey.enabled) {
      msgs = [
        ...msgs,
        <div className="status enabled" key="enabled">
          Aberta
        </div>
      ]
    } else {
      msgs = [
        ...msgs,
        <div className="status disabled" key="disabled">
          Fechada
        </div>
      ]
    }

    if (survey.show_results) {
      msgs = [
        ...msgs,
        <div className="status show-results" key="show-results">
          Resultados disponíveis
        </div>
      ]
    } else {
      msgs = [
        ...msgs,
        <div className="status hide-results" key="hide-results">
          Resultados ocultos
        </div>
      ]
    }

    return msgs
  }

  return (
    <div className={`survey ${survey.active ? "active" : ""}`}>
      <div className="s-icon">
        <i className="fas fa-chart-pie" />
        {renderSurveyStatus()}
      </div>
      <div className="s-content">
        <p className="s-title">{survey.title}</p>
        <div className="s-ans-container">{renderAnswers()}</div>
      </div>
      <div className="s-buttons">{renderButtons()}</div>
    </div>
  )
}

export default Surveys
