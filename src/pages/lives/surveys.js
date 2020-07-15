import React, { useEffect, useState } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { toPairs, fromPairs, omit, isUndefined } from "lodash"
import { toast } from "react-toastify"
import Modal from "react-modal"

import Survey from "./survey"
import AddSurvey from "./add-survey"

import { db } from "../../firebase"

function Surveys({ fbRefStr }) {
  const streamer = useSelector((state) => state.streamer, shallowEqual)
  const [surveys, setSurveys] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [showSurveys, setShowSurveys] = useState(false)

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

  const deactivateSurvey = (survey_id) => {
    const survey = surveys.find((sur) => sur.id === survey_id)

    db.ref(`${fbRefStr}/surveys/${survey_id}`)
      .set({
        ...omit(survey, "id"),
        active: false,
        enabled: false,
        show_results: false
      })
      .then(() => toast("Enquete desativada"))
  }

  const updateSurvey = (survey_id, attr, value) => {
    if (isUndefined(survey_id) || isUndefined(attr) || isUndefined(value)) {
      return
    }

    db.ref(`${fbRefStr}/surveys/${survey_id}/${attr}`)
      .set(value)
      .then(() => {
        if (attr === "enabled" && value === true) {
          return toast("Os usuário podem responder esta enquete")
        }
        if (attr === "enabled" && value === false) {
          return toast("Os usuário não podem responder esta enquete")
        }
        if (attr === "show_results" && value === true) {
          return toast("Resultados de enquete disponíveis para os usuários")
        }
        if (attr === "show_results" && value === false) {
          return toast("Resultados de enquete ocultados dos usuários")
        }
      })
  }

  const closeModal = () => setModalOpen(false)

  return (
    <>
      <div className="survey-manager">
        <button
          className="add-survey"
          onClick={() => setModalOpen(true)}
          type="text"
        >
          <i className="fas fa-plus"></i>
          <span>Adicionar Enquete</span>
        </button>
        <button
          className="show-surveys"
          onClick={() => setShowSurveys(!showSurveys)}
          type="text"
        >
          <i className="fas fa-chart-pie"></i>
          <span>{showSurveys ? "Ocultar" : "Mostrar"} Enquetes</span>
        </button>
      </div>
      <div className={`show-survey-list ${showSurveys ? "active" : ""}`}>
        {surveys.map((s) => (
          <Survey
            survey={s}
            key={s.id}
            activateSurvey={activateSurvey}
            deactivateSurvey={deactivateSurvey}
            updateSurvey={updateSurvey}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            left: "50%",
            transform: "translateX(-50%)"
          }
        }}
      >
        <AddSurvey fbRefStr={fbRefStr} closeModal={closeModal} />
      </Modal>
    </>
  )
}

export default Surveys
