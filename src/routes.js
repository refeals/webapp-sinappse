import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

import Main from "./pages/main"
import GetEventData from "./pages/main/getEventData"
import Livestream from "./pages/livestream"

// import { store } from "../index"
// import { isAuthenticated, isTokenExpired } from "../api/auth"
// import { doLogoutExpiredToken } from "../actions/auth_actions"

// const PrivateRoute = ({ component: Component, dispatch, ...other }) => (
//   <Route
//     {...other}
//     render={props => {
//       if (isTokenExpired()) {
//         store.dispatch(doLogoutExpiredToken())
//         return <Redirect to="/" />
//       } else if (isAuthenticated()) {
//         return <Component {...props} />
//       }
//       return (
//         <Redirect
//           to={{ pathname: basename, state: { from: props.location } }}
//         />
//       )
//     }}
//   />
// )

const redirectToSinappse = () => {
  if (process.env.NODE_ENV === "development") return <Redirect to="/134" />

  window.location.replace("http://www.sinappse.com.br")
}

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={redirectToSinappse} />

        <Route
          path="/:event_id"
          render={(props) => {
            return (
              <>
                <GetEventData {...props} />
                <Route path="/:event_id" exact component={Main} />
                <Route path="/:event_id/lives" exact component={Livestream} />
              </>
            )
          }}
        />

        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
