import React, { useState, useEffect } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { toPairs } from "lodash"
import moment from "moment"

import { db } from "../../firebase"

const LivestreamChat = ({ live }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const [messages, setMessages] = useState([])

  const chatRefStr = `event/${event.id}/livestream/${live.id}/chat`

  useEffect(() => {
    db.ref(chatRefStr)
      .limitToLast(50)
      .on("value", (snapshot) => {
        const val = snapshot.val()
        const valArr = toPairs(val)
        setMessages(valArr)
      })
  }, [chatRefStr])

  const showMessages = () => {
    return messages.map((msg) => {
      return (
        <li className="message" key={msg[0]}>
          <p>
            <small className="date">
              {moment(msg[1].timestamp).format("HH:mm")}
            </small>
            <strong className="name">{msg[1].name}</strong>
            <span className="text">{msg[1].message}</span>
          </p>
        </li>
      )
    })
  }

  return (
    <div className="chat-container">
      <ul className="pages">
        <li className="chat page">
          <div className="chatArea">
            <ul className="messages">{showMessages()}</ul>
          </div>
          <form className="sendMessageForm">
            <input className="inputMessage" />
            <button className="submitMessage" type="submit">
              Enviar
            </button>
          </form>
        </li>
        {/* <li className="survey">
          <p className="title text-center"></p>
          <div className="buttons">
            <button className="survey-option answer1">Sim</button>
            <button className="survey-option answer2">Não</button>
          </div>
          <div className="live-result">
            <div className="live-result-item answer1"></div>
            <div className="live-result-item answer2"></div>
          </div>
        </li> */}
      </ul>
    </div>
  )
}

export default LivestreamChat
