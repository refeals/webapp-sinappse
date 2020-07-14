import React from "react"
import { toPairs, size, round } from "lodash"

function Survey({ survey, activateSurvey, deactivateSurvey, updateSurvey }) {
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

    let buttons = [
      <button
        className="s-button red"
        onClick={() => deactivateSurvey(survey.id)}
        key="start"
      >
        Finalizar Enquete
      </button>
    ]

    if (survey.enabled) {
      buttons = [
        ...buttons,
        <button
          className="s-button finalize"
          onClick={() => updateSurvey(survey.id, "enabled", false)}
          title="Clique para não permitir que os usuários respondam"
          key="finalize"
        >
          Proibir respostas
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
          Permitir respostas
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

export default Survey
