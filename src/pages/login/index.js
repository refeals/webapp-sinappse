import { isEmpty, isUndefined } from "lodash"
import queryString from "query-string"
import React, { useEffect, useRef, useState } from "react"
import FacebookLogin from "react-facebook-login"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Link, Redirect, Route, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { getAbstracts } from "../../actions/abstract_actions"
import {
  HIDE_TOP_MENU,
  SET_INITIAL,
  SHOW_TOP_MENU
} from "../../actions/action_types"
import { doLogin, doSignUp } from "../../actions/auth_actions"
import { getExhibitors } from "../../actions/exhibitor_actions"
import { getLivestream } from "../../actions/livestream_actions"
import { getPrograms } from "../../actions/programs_actions"
import { getSpeakers } from "../../actions/speaker_actions"
import { getSponsors } from "../../actions/sponsor_actions"
import bg from "../../images/bg_138.jpg"
import { persistor } from "../../store"
import ChangePassword from "./change_password"
import ForgotPassword from "./forgot"

const MainAccess = ({ match, location }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [passwd, setPasswd] = useState("")
  const [confirmPasswd, setConfirmPasswd] = useState("")

  const [canClick, setCanClick] = useState(false)
  const [showFooter, setShowFooter] = useState(true)
  const [documentHeight] = useState(document.documentElement.clientHeight)

  const loginEmailInput = useRef(null)
  const signupNameInput = useRef(null)

  useEffect(() => {
    dispatch({ type: SET_INITIAL })
    persistor.purge()
  }, [dispatch])

  useEffect(() => {
    if (localStorage.linkedinCode && event.id) {
      const accessToken = localStorage.linkedinCode

      dispatch(
        doLogin(
          {
            data: {
              access_token: accessToken,
              redirect_uri: process.env.REACT_APP_LINKEDIN_REDIRECT_URI
            },
            type: "linkedin",
            event_id: event.id
          },
          {
            onSuccess: () => getEventInformation(),
            onError: (err) => {
              localStorage.removeItem("linkedinCode")
              localStorage.removeItem("linkedinState")
              toast(err)
            }
          }
        )
      )
    } // eslint-disable-next-line
  }, [event.id, dispatch])

  useEffect(() => {
    const linkedinResponse = queryString.parse(location.search)

    if (
      !isEmpty(linkedinResponse) &&
      !isEmpty(linkedinResponse.code) &&
      !isEmpty(linkedinResponse.state)
    ) {
      localStorage.setItem("linkedinCode", linkedinResponse.code)
      localStorage.setItem("linkedinState", linkedinResponse.state)
    }
  }, [location.search])

  useEffect(() => {
    if (!isUndefined(event.id)) {
      if (isUndefined(localStorage.linkedinCode)) {
        setCanClick(true)
      }
    }
  }, [event.id])

  useEffect(() => {
    const { pathname } = history.location

    // login
    if (pathname === `/${event.slug}/login`) {
      setEmail("")
      setPasswd("")
      loginEmailInput.current.focus()
    }

    // signup
    if (pathname === `/${event.slug}/signup`) {
      setName("")
      setEmail("")
      setPasswd("")
      setConfirmPasswd("")
      signupNameInput.current.focus()
    }
  }, [history.location, event.slug])

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (document.documentElement.clientHeight >= documentHeight) {
        setShowFooter(true)
      } else {
        setShowFooter(false)
      }
    })
  }, [documentHeight])

  if (match.url === "/signin-linkedin") {
    if (localStorage.getItem("linkedinState")) {
      return <Redirect to={`/${localStorage.getItem("linkedinState")}`} />
    }
  }

  const handleLogin = () => {
    dispatch(
      doLogin(
        { data: { email, passwd }, type: "email", event_id: event.id },
        {
          onSuccess: () => getEventInformation(),
          onError: (err) => toast(err)
        }
      )
    )
  }

  const handleSignUp = () => {
    if (passwd.length < 6) {
      toast("Senha deve conter pelo menos 6 dígitos")
      return
    }
    if (passwd !== confirmPasswd) {
      toast("Senha e Confirmação não são iguais")
      return
    }

    dispatch(
      doSignUp(
        { data: { name, email, passwd, confirmPasswd }, event },
        {
          onSuccess: () => getEventInformation(),
          onError: (err) => toast(err)
        }
      )
    )
  }

  const responseFacebook = ({ accessToken }) => {
    dispatch(
      doLogin(
        {
          data: { access_token: accessToken },
          type: "facebook",
          event_id: event.id
        },
        {
          onSuccess: () => getEventInformation(),
          onError: (err) => toast(err)
        }
      )
    )
  }

  const requestLinkedin = () => {
    window.location.replace(
      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENT_ID}&scope=r_emailaddress,r_liteprofile,w_member_social&state=${event.slug}&redirect_uri=${process.env.REACT_APP_LINKEDIN_REDIRECT_URI}`
    )
  }

  const getEventInformation = () => {
    if (event.id) {
      dispatch({ type: SHOW_TOP_MENU })
      Promise.all([
        dispatch(getLivestream(event.id)),
        dispatch(getPrograms(event.id)),
        dispatch(getSpeakers(event.id)),
        dispatch(getAbstracts(event.id)),
        dispatch(getExhibitors(event.id)),
        dispatch(getSponsors(event.id))
      ])
        .then((res) => {
          localStorage.removeItem("linkedinCode")
          localStorage.removeItem("linkedinState")
          history.push(`/${event.slug}`)
        })
        .catch((err) => {
          dispatch({ type: HIDE_TOP_MENU })
          localStorage.removeItem("linkedinCode")
          localStorage.removeItem("linkedinState")
          history.push(`/${event.slug}`)
          console.log(err)
        })
    } else {
      // setLoaded(true)
      console.log("no event.id")
    }
  }

  const renderMainPage = () => {
    return (
      <>
        <h1>{event.eventName}</h1>
        <footer>
          <Link to="#" className="nounderline">
            <p className="terms">
              Ao se cadastrar, você estará automaticamente aceitando os{" "}
              <strong>termos de uso</strong>
            </p>
          </Link>
          <p className="developed-by">
            <strong>Desenvolvido por Sinappse</strong>
          </p>
          <div className="buttons">
            {canClick ? (
              <>
                <Link to={`/${event.slug}/login`}>Acessar</Link>
                <Link to={`/${event.slug}/signup`}>Cadastrar</Link>
              </>
            ) : (
              <button onClick={() => undefined} disabled={true}>
                <i className="fa fa-spinner fa-spin" />
              </button>
            )}
          </div>
        </footer>
      </>
    )
  }

  const renderLoginPage = () => {
    return (
      <>
        <div className="back-icon" onClick={() => history.goBack()}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="form-content">
          <p className="text">Acesse sua conta</p>

          {renderSocialMediaButtons()}

          <p>OU</p>

          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault()
              handleLogin()
            }}
          >
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={loginEmailInput}
            />
            <input
              type="password"
              placeholder="Senha"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
            />

            <p className="forgot-signup">
              <Link to={`/${event.slug}/forgot`}>Esqueci minha senha</Link>
              <Link to={`/${event.slug}/signup`}>Cadastrar nova conta</Link>
            </p>
            <footer className={showFooter ? "" : "hide-footer"}>
              <div className="buttons">
                <button type="submit">Entrar</button>
              </div>
            </footer>
          </form>
        </div>
      </>
    )
  }

  const renderSignUpPage = () => {
    return (
      <>
        <div className="back-icon" onClick={() => history.goBack()}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="form-content">
          <p className="text">Acesse sua conta</p>

          {renderSocialMediaButtons()}

          <p>OU</p>

          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault()
              handleSignUp()
            }}
          >
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={signupNameInput}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPasswd}
              onChange={(e) => setConfirmPasswd(e.target.value)}
            />
            <footer className={showFooter ? "" : "hide-footer"}>
              <div className="buttons">
                <button type="submit">Cadastrar</button>
              </div>
            </footer>
          </form>
        </div>
      </>
    )
  }

  const renderSocialMediaButtons = (show = true) => {
    return (
      <div className="social-media-buttons" style={{ opacity: show ? 1 : 0 }}>
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          fields="name,email,picture"
          disableMobileRedirect
          isMobile
          callback={show ? responseFacebook : undefined}
          icon={<i className="fab fa-facebook" />}
          textButton=""
        />
        <span>
          <button
            onClick={show ? requestLinkedin : undefined}
            className="linkedin"
          >
            <i className="fab fa-linkedin" />
          </button>
        </span>
      </div>
    )
  }

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundColor: event.eventColor
      }}
    >
      <Route exact path={`/${event.slug}`} render={renderMainPage} />
      <Route exact path={`/${event.slug}/login`} render={renderLoginPage} />
      <Route exact path={`/${event.slug}/signup`} render={renderSignUpPage} />
      <Route
        exact
        path={`/${event.slug}/forgot`}
        render={(props) => (
          <ForgotPassword
            {...props}
            showFooter={renderSocialMediaButtons}
            socialMediaButtons={renderSocialMediaButtons}
          />
        )}
      />
      <Route
        exact
        path={`/${event.slug}/rescue`}
        render={(props) => (
          <ChangePassword
            {...props}
            showFooter={renderSocialMediaButtons}
            socialMediaButtons={renderSocialMediaButtons}
          />
        )}
      />
    </div>
  )
}

export default MainAccess
