import { isEmpty, isNull, map, size, sortBy, sum, toPairs } from "lodash"
import React, { useState } from "react"
import { PieChart } from "react-minimal-pie-chart"
import { shallowEqual, useSelector } from "react-redux"
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
      ).push(parseInt(user.id))

      if (!survey.show_results) {
        closeModal()
      }
    }
  }

  const renderSurveyPage = () => {
    if (survey.enabled) {
      if (isSurveyVoted()) {
        if (survey.show_results) {
          return renderSurveyResults()
        }
        return <></>
      }
      return renderSurveyQuestions()
    } else {
      if (survey.show_results) {
        return renderSurveyResults()
      }
      return <></>
    }
  }

  const renderSurveyQuestions = () => {
    return (
      <>
        <div className="survey-title">
          Enquete
          <i
            className="fas fa-times"
            style={{ color: event.eventColor }}
            onClick={closeModal}
          />
        </div>
        <div className="survey-question">{survey.title}</div>
        <div className="survey-answers">{renderAnswers()}</div>
        <button className="send-answer" onClick={handleSendAnswer}>
          Answer
        </button>
      </>
    )
  }

  const renderAnswers = () => {
    const sortedAnswers = sortBy(toPairs(survey.answers), ([key]) => key)
    return map(sortedAnswers, ([key, val]) => {
      return (
        <div
          className={`answer ${selectedAnswer === key ? "selected" : ""}`}
          key={key}
          onClick={() => setSelectedAnswer(key)}
        >
          {val.title}
        </div>
      )
    })
  }

  const renderSurveyResults = () => {
    const getRandomColor = () => {
      const letters = "0123456789ABCDEF"
      let color = "#"
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }

    const totalVotes = sum(map(survey.answers, (val) => size(val.user_ids)))

    const chartData = map(survey.answers, (val, key) => {
      return {
        value: size(val.user_ids),
        title: val.title,
        color: val.color ?? getRandomColor(),
        key
      }
    })

    const defaultLabelStyle = {
      fontSize: "4",
      fontFamily: "sans-serif",
      fill: "#fff"
    }

    return (
      <>
        <div className="survey-title">
          Enquete
          <i
            className="fas fa-times"
            style={{ color: event.eventColor }}
            onClick={closeModal}
          />
        </div>
        <div className="survey-question">{survey.title}</div>
        <div className="survey-chart">
          <PieChart
            data={chartData}
            label={({ dataEntry }) =>
              `${Math.round((dataEntry.value * 100) / totalVotes)}% - ${
                dataEntry.title
              }`
            }
            totalValue={totalVotes}
            labelStyle={{
              ...defaultLabelStyle
            }}
          />
        </div>
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
