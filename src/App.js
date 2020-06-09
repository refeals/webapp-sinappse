import React from "react"

import "./css/load.scss"

import Routes from "./routes"

const App = () => {
  return (
    <div className="App">
      <section id="viewer">
        <Routes />
      </section>
    </div>
  )
}

export default App
