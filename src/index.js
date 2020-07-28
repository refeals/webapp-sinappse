import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { applyMiddleware, compose, createStore } from "redux"
import axiosMiddleware from "redux-axios-middleware"
import { persistReducer, persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import { api } from "./api"
import App from "./App"
import "./index.css"
import reducers from "./reducers"
import * as serviceWorker from "./serviceWorker"
import ViewerLoading from "./ViewerLoading"

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["topMenu", "streamer"]
  // debug: process.env.NODE_ENV === "development",
  // transforms: [
  //   createTransform(
  //     // transform state on its way to being serialized and persisted.
  //     (inboundState, key, state) => {
  //       if (state.event.id) {
  //         return { ...state, [state.event.id]: inboundState }
  //       } else {
  //         return { ...state, ...inboundState }
  //       }
  //     },
  //     // transform state being rehydrated
  //     (outboundState, key, state) => {
  //       // return { ...outboundState }
  //       const finalState =
  //         outboundState[localStorage.getItem(`@sinappse-current-event`)]

  //       if (!!finalState) {
  //         return {}
  //       }

  //       if (isArray(finalState)) {
  //         return [...finalState]
  //       }
  //       if (isObject(finalState)) {
  //         return { ...finalState }
  //       }
  //       return finalState
  //     },
  //     { blacklist: "user" }
  //   )
  // ]
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk, axiosMiddleware(api)),
    process.env.NODE_ENV === "development" &&
      window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
)
const persistor = persistStore(store)

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
