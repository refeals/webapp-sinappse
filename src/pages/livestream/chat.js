import React, { useState, useEffect, useRef } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { toPairs, isNull, map, flatten, values } from "lodash"
import moment from "moment"

import { db } from "../../firebase"
import SurveyModal from "./surveys"

const LivestreamChat = ({ live }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const user = useSelector((state) => state.user, shallowEqual)

  const [newMsg, setNewMsg] = useState("")
  const [messages, setMessages] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [survey, setSurvey] = useState(null)
  const textInput = useRef(null)

  const chatRefStr = `event/${event.id}/livestream/${live.id}/chat`
  const chatRef = db.ref(chatRefStr)

  const surveyRefStr = `event/${event.id}/livestream/${live.id}/surveys`

  // get new messages
  useEffect(() => {
    db.ref(chatRefStr)
      .limitToLast(50)
      .on("value", (snapshot) => {
        const val = snapshot.val()
        const valArr = toPairs(val)
        setMessages(valArr)
      })
  }, [chatRefStr])

  // get new survey
  useEffect(() => {
    db.ref(surveyRefStr)
      .orderByChild("active")
      .equalTo(true)
      .limitToLast(1)
      .on("value", (snapshot) => {
        const val = snapshot.val()
        if (!isNull(val)) {
          const srvData = toPairs(val)[0]
          setSurvey({
            ...srvData[1],
            survey_id: srvData[0]
          })
        }
      })
  }, [surveyRefStr])

  // scroll down when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // scroll down when new messages arrive
  useEffect(() => {
    if (!isNull(survey) && isOpen) {
      if (survey.enabled) {
        if (isSurveyVoted()) {
          if (survey.show_results) {
            return setIsOpen(true)
          }
          return setIsOpen(false)
        }
        return setIsOpen(true)
      } else {
        if (survey.show_results) {
          return setIsOpen(true)
        }
        return setIsOpen(false)
      }
    }
  }, [survey])

  // check if survey is already voted by user
  const isSurveyVoted = () => {
    if (!isNull(survey)) {
      const userIds = flatten(map(survey.answers, (a) => values(a.user_ids)))
      return userIds.includes(user.id)
    } else {
      return false
    }
  }

  // focus input on first render
  useEffect(() => {
    textInput.current.focus()
  }, [])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (newMsg.length > 0) {
      chatRef.push({
        timestamp: Date.now(),
        message: newMsg,
        name: user.name,
        id: user.id
      })

      scrollToBottom()
      setNewMsg("")
      textInput.current.focus()
    }
  }

  const scrollToBottom = () => {
    const msgs = document.querySelector(".messages")
    msgs.scrollTop = msgs.scrollHeight
  }

  const showMessages = () => {
    return messages.map((msg) => {
      return (
        <li className="message" key={msg[0]}>
          <p>
            <small className="date">
              {moment(msg[1].timestamp).format("HH:mm")}
            </small>
            <span
              className={`name ${msg[1].speaker ? "speaker" : ""} ${
                msg[1].id === user.id ? "logged-user" : ""
              }`}
            >
              {msg[1].name}:
            </span>
            <span className={`text ${msg[1].speaker ? "speaker" : ""}`}>
              {msg[1].message}
            </span>
          </p>
        </li>
      )
    })
  }

  const showSurveyButton = () => {
    if (isNull(survey)) {
      return false
    }

    if (survey.enabled) {
      if (isSurveyVoted()) {
        if (survey.show_results) {
          return true
        }
        return false
      }
      return true
    } else {
      if (survey.show_results) {
        return true
      }
      return false
    }
  }

  console.log(survey)
  return (
    <div className="chat-container">
      <ul className="pages">
        <li className="chat page">
          <div className="chatArea">
            <ul className="messages">{showMessages()}</ul>
          </div>
          <form className="sendMessageForm" onSubmit={handleSendMessage}>
            <input
              className="inputMessage"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              ref={textInput}
            />
            <button className="submitMessage" type="submit">
              <i className="fas fa-paper-plane" />
            </button>
            <button
              className={`toggleModal ${showSurveyButton() ? "active" : ""}`}
              onClick={() => setIsOpen(true)}
            >
              <i className="fas fa-chart-pie" />
            </button>
          </form>
        </li>
        <SurveyModal
          open={isOpen}
          survey={survey}
          closeModal={() => setIsOpen(false)}
          isSurveyVoted={isSurveyVoted}
          surveyRefStr={surveyRefStr}
        />
      </ul>
    </div>
  )
}

export default LivestreamChat
