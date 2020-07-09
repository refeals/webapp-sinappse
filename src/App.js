import React from "react"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

import Routes from "./routes"

const App = () => {
  return (
    <div className="App">
      <section id="viewer">
        <Routes />
      </section>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
