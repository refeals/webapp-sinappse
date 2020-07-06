import React, { useState } from "react"
import { isEmpty, map, isNull } from "lodash"
import { useSelector, shallowEqual } from "react-redux"

import { db } from "../../firebase"

function SurveyModal({
  open,
  survey,
  closeModal,
  isSurveyVoted,
  surveyRefStr
}) {
  const event = useSelector((state) => state.event, shallowEqual)
  const user = useSelector((state) => state.user, shallowEqual)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  if (isEmpty(survey) || !open) {
    return <></>
  }

  const handleSendAnswer = () => {
    if (!isNull(selectedAnswer)) {
      db.ref(
        `${surveyRefStr}/${survey.survey_id}/answers/${selectedAnswer}/user_ids`
      ).push(user.id)
    }
  }
  console.log(survey)

  const renderSurveyPage = () => {
    if (isSurveyVoted()) {
      return renderSurveyResults()
    }
    return renderSurveyQuestions()
  }

  const renderSurveyQuestions = () => {
    return (
      <>
        <div className="survey-title">
          Survey
          <i
            className="fas fa-times"
            style={{ color: event.eventColor }}
            onClick={closeModal}
          />
        </div>
        <div className="survey-question">{survey.title}</div>
        <div className="survey-answers">
          {map(survey.answers, (val, key) => {
            return (
              <div
                className={`answer ${selectedAnswer === key ? "selected" : ""}`}
                key={key}
                onClick={() => setSelectedAnswer(key)}
              >
                {val.title}
              </div>
            )
          })}
        </div>
        <button className="send-answer" onClick={handleSendAnswer}>
          Answer
        </button>
      </>
    )
  }

  const renderSurveyResults = () => {
    return (
      <>
        <div className="survey-title">
          Survey
          <i
            className="fas fa-times"
            style={{ color: event.eventColor }}
            onClick={closeModal}
          />
        </div>
        <div className="survey-question">{survey.title}</div>
        <div className="survey-chart"></div>
      </>
    )
  }

  return (
    <div className="survey-overlay">
      <div className="survey-modal">{renderSurveyPage()}</div>
    </div>
  )
}

export default SurveyModal
