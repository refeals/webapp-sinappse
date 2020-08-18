import { isUndefined } from "lodash"
import preval from "preval.macro"
import React, { lazy, Suspense, useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Route, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { getAbstracts } from "./actions/abstract_actions"
import { GET_USER, SHOW_TOP_MENU } from "./actions/action_types"
import { doLogout } from "./actions/auth_actions"
import { getEvent } from "./actions/event_actions"
import { getExhibitors } from "./actions/exhibitor_actions"
import { getLivestream } from "./actions/livestream_actions"
import { getPrograms } from "./actions/programs_actions"
import { getSpeakers } from "./actions/speaker_actions"
import { getSponsors } from "./actions/sponsor_actions"
import "./css/load.scss"
import ViewerLoading from "./ViewerLoading"

const Main = lazy(() => import("./pages/main"))
const Program = lazy(() => import("./pages/program"))
const Category = lazy(() => import("./pages/program/category"))
const Talk = lazy(() => import("./pages/program/talk"))
const Speakers = lazy(() => import("./pages/speakers"))
const Speaker = lazy(() => import("./pages/speakers/show"))
const Abstracts = lazy(() => import("./pages/abstracts"))
const Abstract = lazy(() => import("./pages/abstracts/show"))
const Exhibitors = lazy(() => import("./pages/exhibitors"))
const Exhibitor = lazy(() => import("./pages/exhibitors/show"))
const Sponsors = lazy(() => import("./pages/sponsors"))
const Sponsor = lazy(() => import("./pages/sponsors/show"))
const Map = lazy(() => import("./pages/map"))
const WebView = lazy(() => import("./pages/webview"))
const Livestream = lazy(() => import("./pages/livestream"))
const Watch = lazy(() => import("./pages/livestream/watch"))
const Login = lazy(() => import("./pages/login"))

const RoutesEvent = ({ match }) => {
  const { event, user, topMenu } = useSelector((state) => state, shallowEqual)
  const dispatch = useDispatch()
  const history = useHistory()

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (match.params.slug !== "signin-linkedin") {
      dispatch(
        getEvent(match.params.slug, {
          onSuccess: () => getEventInformation(),
          onError: (msg) => {
            toast(`Evento '${match.params.slug}' não encontrado`)
            history.push("/404")
          },
          onNetWorkError: (msg) => {
            if (!!event.id) {
              setLoaded(true)
            }
            console.log(msg)
          },
        }),
      )
    } else {
      setLoaded(true)
    } // eslint-disable-next-line
  }, [dispatch, match.params.slug])

  // user is logged in
  useEffect(() => {
    if (localStorage.getItem(`@sinappse-user-token`)) {
      dispatch({ type: SHOW_TOP_MENU })
      dispatch({ type: GET_USER, event: event.id })
    }
  }, [dispatch, event.id])

  // user is logged on event 1 and goes to event 2
  useEffect(() => {
    if (user.event_slug && user.event_slug !== match.params.slug) {
      dispatch(doLogout())
      history.push(`/${match.params.slug}`)
    }
  }, [user.event_slug, match.params.slug, dispatch, history])

  // set build log time
  useEffect(() => {
    if (event.id === 138) {
      if (process.env.NODE_ENV === "production") {
        console.log("Build time log: ")
        console.log(preval`module.exports = new Date().toLocaleString();`)
      }
    }
  }, [event.id])

  // function to get all event information
  const getEventInformation = () => {
    setLoaded(true)

    if (navigator.onLine) {
      if (event.id) {
        Promise.all([
          dispatch(getLivestream(event.id)),
          dispatch(getPrograms(event.id)),
          dispatch(getSpeakers(event.id)),
          dispatch(getAbstracts(event.id)),
          dispatch(getExhibitors(event.id)),
          dispatch(getSponsors(event.id)),
        ])
          .then((res) => {
            console.log("data loaded")
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        // setLoaded(true)
        console.log("no event.id")
      }
    }
  }

  // show viewer loading if event api call is not done
  if (!loaded) {
    return <ViewerLoading />
  }

  // show viewer loading if event does not exist
  if (isUndefined(event.id)) {
    return <ViewerLoading hideLoading />
  }

  // first render -> if user not logged in
  if (!localStorage.getItem(`@sinappse-user-token`)) {
    return (
      <Suspense fallback={<ViewerLoading />}>
        <Route path="/:event_id" component={Login} />
      </Suspense>
    )
  }

  const hide = match.path === "/:slug" && match.isExact ? "hide" : ""

  const sections = event.sections
    .filter((s) => s.type !== "WEBVIEW")
    .map((s) => s.type)
  const sections_webview = event.sections
    .filter((s) => s.type === "WEBVIEW")
    .map((s) => ({ type: s.type, params: s.params }))

  // second render -> if user logged in
  return (
    <Suspense fallback={<ViewerLoading />}>
      <div
        className="mainarea"
        style={{ height: topMenu.hide ? "100vh" : "calc(100vh - 46px)" }}
      >
        <ul className="viewer-menu">
          <Route exact path="/:event_id" component={Main} />
        </ul>
        <div className={`open-section ${hide}`}>
          {sections.includes("PROGRAM") && (
            <>
              <Route exact path="/:event_id/program" component={Program} />
              <Route
                exact
                path="/:event_id/program/:category_id"
                component={Category}
              />
              <Route
                exact
                path="/:event_id/program/:category_id/:talk_id"
                component={Talk}
              />
            </>
          )}
          {sections.includes("SPEAKERS") && (
            <>
              <Route exact path="/:event_id/speakers" component={Speakers} />
              <Route
                exact
                path="/:event_id/speakers/:speaker_id"
                component={Speaker}
              />
            </>
          )}
          {sections.includes("ABSTRACTS") && (
            <>
              <Route exact path="/:event_id/abstracts" component={Abstracts} />
              <Route
                exact
                path="/:event_id/abstracts/:abstract_id"
                component={Abstract}
              />
            </>
          )}
          {sections.includes("EXHIBITORS") && (
            <>
              <Route
                exact
                path="/:event_id/exhibitors"
                component={Exhibitors}
              />
              <Route
                exact
                path="/:event_id/exhibitors/:exhibitor_id"
                component={Exhibitor}
              />
            </>
          )}
          {sections.includes("SPONSORS") && (
            <>
              <Route exact path="/:event_id/sponsors" component={Sponsors} />
              <Route
                exact
                path="/:event_id/sponsors/:sponsor_id"
                component={Sponsor}
              />
            </>
          )}
          {sections.includes("MAP") && (
            <Route exact path="/:event_id/map" component={Map} />
          )}
          {sections.includes("LIVESTREAM") && (
            <>
              <Route exact path="/:event_id/lives" component={Livestream} />
              <Route exact path="/:event_id/lives/:live_id" component={Watch} />
            </>
          )}

          {sections_webview.map((s) => {
            return (
              <Route
                exact
                path={`/:event_id/${s.params.type}`}
                render={(props) => <WebView {...props} {...s.params} />}
                key={s.params.type}
              />
            )
          })}
        </div>
      </div>
    </Suspense>
  )
}

export default RoutesEvent
