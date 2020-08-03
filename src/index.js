import preval from "preval.macro"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import App from "./App"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import { persistor, store } from "./store"
import ViewerLoading from "./ViewerLoading"

if (process.env.NODE_ENV === "production") {
  console.log(preval`module.exports = new Date().toLocaleString();`)
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<ViewerLoading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
