import React, { useState, useEffect } from "react"
import { toPairs } from "lodash"
import moment from "moment"

import { db } from "../../firebase"

function Chat({ fbRefStr }) {
  const [tab, setTab] = useState(0)
  const [messages, setMessages] = useState([])
  const [newMsg, setNewMsg] = useState("")
  const streamer = {
    name: "Palestrante 01",
    id: -1
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
        name: streamer.name,
        id: streamer.id
      })

      setNewMsg("")
      scrollToBottom()
    }
  }

  const selectChatTab = (tab) => {
    setMessages([])
    setTab(tab)
  }

  const showMessages = () => {
    return messages.map((msg) => {
      const isSpeaker = msg[1].speaker
      const isLogged = msg[1].id === streamer.id

      const whichTab = () => (tab === 0 ? isSpeaker : isLogged)

      return (
        <li className={`message ${whichTab() ? "speaker" : ""}`} key={msg[0]}>
          <p className="content">
            <span className="name">{msg[1].name}: </span>
            <span className="text">{msg[1].message}</span>
          </p>
          <p className="date-content">
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
      <div className="tab-buttons">
        <button
          onClick={() => selectChatTab(0)}
          className={tab === 0 ? "active" : ""}
        >
          Chat Normal
        </button>
        <button
          onClick={() => selectChatTab(1)}
          className={tab === 1 ? "active" : ""}
        >
          Chat Admins
        </button>
      </div>

      <ul className="messages">{showMessages()}</ul>
      <form className="sendMessageForm" onSubmit={handleSendMessage}>
        <input
          className="inputMessage"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button className="send-message" type="submit">
          <i className="fas fa-paper-plane" />
        </button>
      </form>
    </div>
  )
}

export default Chat
