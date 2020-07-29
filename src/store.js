import { applyMiddleware, compose, createStore } from "redux"
import axiosMiddleware from "redux-axios-middleware"
import { createMigrate, persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist-indexeddb-storage"
import createEncryptor from "redux-persist-transform-encrypt"
import thunk from "redux-thunk"
import { api } from "./api"
import reducers from "./reducers"

const migrations = {
  0: (state) => {
    return { ...state }
  }
}

const encryptor = createEncryptor({
  secretKey: process.env.REACT_APP_REDUX_PERSIST_ENCRYPT_SECRET_KEY,
  onError: function (err) {
    console.log(err)
  }
})

const persistConfig = {
  key: "root",
  storage: storage("sinappse"),
  blacklist: ["topMenu", "streamer", "user", "event"],
  migrate: createMigrate(migrations, { debug: false }),
  transforms: [encryptor],
  version: 0
  // debug: process.env.NODE_ENV === "development",
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
