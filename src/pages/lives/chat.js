import React, { useState, useEffect } from "react"
import { toPairs } from "lodash"
import moment from "moment"

import { db } from "../../firebase"

function Chat({ fbRefStr }) {
  const [tab, setTab] = useState(0)
  const [messages, setMessages] = useState([])
  const [newMsg, setNewMsg] = useState("")
  const user = {
    name: "Palestrante",
    id: 0
  }

  const setChat = () => {
    switch (tab) {
      case 0:
        return "chat"
      case 1:
        return "chat_admin"

      default:
        return ""
    }
  }

  // get new messages
  useEffect(() => {
    if ([0, 1].includes(tab)) {
      db.ref(`${fbRefStr}/${setChat()}`)
        .limitToLast(50)
        .on("value", (snapshot) => {
          const val = snapshot.val()
          const valArr = toPairs(val)
          setMessages(valArr)
        })
    } // eslint-disable-next-line
  }, [fbRefStr, tab])

  // scroll down when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (newMsg.length > 0) {
      db.ref(`${fbRefStr}/${setChat()}`).push({
        timestamp: Date.now(),
        message: newMsg,
        speaker: true,
        name: user.name,
        id: user.id
      })

      setNewMsg("")
      scrollToBottom()
    }
  }

  const showMessages = () => {
    return messages.map((msg) => {
      return (
        <li className="message" key={msg[0]}>
          <p className={`content ${msg[1].speaker ? "speaker" : ""}`}>
            <span className="name">{msg[1].name}: </span>
            <span className="text">{msg[1].message}</span>
          </p>
          <p className={`date-content ${msg[1].speaker ? "speaker" : ""}`}>
            <small className="date">
              {moment(msg[1].timestamp).format("HH:mm")}
            </small>
          </p>
        </li>
      )
    })
  }

  const scrollToBottom = () => {
    const msgs = document.querySelector(".messages")
    msgs.scrollTop = msgs.scrollHeight
  }

  return (
    <div className="spk-chat-container">
      <ul className="messages">{showMessages()}</ul>
      <form className="sendMessageForm" onSubmit={handleSendMessage}>
        <input
          className="inputMessage"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button className="submitMessage" type="submit">
          <i className="fas fa-paper-plane" />
        </button>
      </form>
    </div>
  )
}

export default Chat
