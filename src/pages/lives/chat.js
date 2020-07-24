import React, { useState, useEffect } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { toPairs } from "lodash"
import moment from "moment"

import { db } from "../../firebase"

function Chat({ fbRefStr }) {
  const event = useSelector((state) => state.event, shallowEqual)
  const streamer = useSelector((state) => state.streamer, shallowEqual)
  const [tab, setTab] = useState(0)
  const [messages, setMessages] = useState([])
  const [adminMessages, setAdminMessages] = useState([])

  const [newMsg, setNewMsg] = useState("")

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
    db.ref(`${fbRefStr}/chat`)
      .limitToLast(50)
      .on("value", (snapshot) => {
        const val = snapshot.val()
        const valArr = toPairs(val)
        setMessages(valArr)
      })
  }, [fbRefStr, tab])

  // get new admin messages
  useEffect(() => {
    db.ref(`${fbRefStr}/chat_admin`)
      .limitToLast(50)
      .on("value", (snapshot) => {
        const val = snapshot.val()
        const valArr = toPairs(val)
        setAdminMessages(valArr)
      })
  }, [fbRefStr])

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      if (event.id) {
        db.ref(`${fbRefStr}/chat_admin`).push({
          timestamp: Date.now(),
          message: `${streamer.name} acabou de entrar`,
          server_message: true,
          name: streamer.name,
          id: streamer.id
        })
      }
    }
  }, [fbRefStr, event.id, streamer.id, streamer.name])

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
    setTab(tab)
  }

  const showMessages = () => {
    const msgs = tab === 0 ? messages : adminMessages

    return msgs.map((msg) => {
      if (msg[1].server_message) {
        return (
          <li className="message server_message" key={msg[0]}>
            <div className="content">
              <div className="text">{msg[1].message}</div>
            </div>
            <div className="date-content">
              <small className="date">
                {moment(msg[1].timestamp).format("HH:mm")}
              </small>
            </div>
          </li>
        )
      }

      const isSpeaker = msg[1].speaker
      const isLogged = msg[1].id === streamer.id

      const whichTab = () => (tab === 0 ? isSpeaker : isLogged)

      return (
        <li className={`message ${whichTab() ? "speaker" : ""}`} key={msg[0]}>
          <div className="content">
            <div className="name">{msg[1].name}: </div>
            <div className="text">{msg[1].message}</div>
          </div>
          <div className="date-content">
            <small className="date">
              {moment(msg[1].timestamp).format("HH:mm")}
            </small>
          </div>
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
          {/* <i className="fas fa-comment-alt" /> */}
        </button>
        <button
          onClick={() => selectChatTab(1)}
          className={tab === 1 ? "active" : ""}
        >
          Chat Admins
          {/* <i className="fas fa-comment-alt" /> */}
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
