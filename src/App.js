import React from "react"

import "./css/load.scss"

import Routes from "./routes"
import TopMenu from "./pages/main/TopMenu"

const App = () => {
  return (
    <div className="App">
      <section id="viewer">
        <TopMenu goHome />
        <div className="mainarea">
          <ul className="viewer-menu">
            <Routes />
          </ul>
          <div className="open-section hide"></div>
        </div>
      </section>
    </div>
  )
}

export default App
