import React, { useEffect, useState } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { toPairs } from "lodash"

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

  return surveys.map((s) => <Survey survey={s} key={s.id} />)
}

function Survey({ survey }) {
  console.log(survey)

  return <div>{survey.title}</div>
}

export default Surveys
