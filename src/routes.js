import React from "react"
import { LinkedInPopUp } from "react-linkedin-login-oauth2"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import TopMenu from "./pages/main/TopMenu"
import RoutesEvent from "./routes_event"

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
  if (process.env.NODE_ENV === "development") {
    return <Redirect to="/dev" />
  }

  window.location.replace("http://www.sinappse.com")
}

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <TopMenu />
        <Switch>
          <Route path="/" exact render={redirectToSinappse} />
          <Route path="/signin-linkedin" exact render={LinkedInPopUp} />
          <Route path="/:slug" component={RoutesEvent} />
          {/* <Route path="*" render={() => <Redirect to="/" />} /> */}
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default Routes
