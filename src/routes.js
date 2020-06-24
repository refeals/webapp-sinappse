import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

import RoutesEvent from "./routes_event"
import TopMenu from "./pages/main/TopMenu"

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
  if (process.env.NODE_ENV === "development") return <Redirect to="/126" />

  window.location.replace("http://www.sinappse.com.br")
}

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <TopMenu goHome />
        <div className="mainarea">
          <Switch>
            <Route path="/" exact render={redirectToSinappse} />
            <Route path="/:event_id" component={RoutesEvent} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  )
}

export default Routes
