import { applyMiddleware, compose, createStore } from "redux"
import axiosMiddleware from "redux-axios-middleware"
import { createMigrate, persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import { api } from "./api"
import "./index.css"
import reducers from "./reducers"

const migrations = {
  0: (state) => {
    return { ...state }
  }
}

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["topMenu", "streamer", "user", "event"],
  migrate: createMigrate(migrations, { debug: false }),
  version: 0
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

export { store, persistor }
