import React, { useState, useEffect, useRef } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { toPairs } from "lodash"
import moment from "moment"

import { db } from "../../firebase"

const LivestreamChat = ({ live }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const user = useSelector((state) => state.user, shallowEqual)

  const [newMsg, setNewMsg] = useState("")
  const [messages, setMessages] = useState([])
  const textInput = useRef(null)

  const chatRefStr = `event/${event.id}/livestream/${live.id}/chat`
  const chatRef = db.ref(chatRefStr)

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

  // scroll down when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
        speaker: false, // TODO - precisa?
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
              <i className="fas fa-paper-plane"></i>
            </button>
            <button className="toggleModal">
              <i className="fas fa-chart-pie" />
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
