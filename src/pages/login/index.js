import { isEmpty, isUndefined } from "lodash"
import queryString from "query-string"
import React, { useEffect, useState } from "react"
import FacebookLogin from "react-facebook-login"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Link, Redirect, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { getAbstracts } from "../../actions/abstract_actions"
import { SET_INITIAL, SHOW_TOP_MENU } from "../../actions/action_types"
import { doLogin, doSignUp } from "../../actions/auth_actions"
import { getExhibitors } from "../../actions/exhibitor_actions"
import { getLivestream } from "../../actions/livestream_actions"
import { getPrograms } from "../../actions/programs_actions"
import { getSpeakers } from "../../actions/speaker_actions"
import { getSponsors } from "../../actions/sponsor_actions"
import bg from "../../images/bg_138.jpg"
import { persistor } from "../../store"

const Login = ({ location }) => {
  const event = useSelector((state) => state.event, shallowEqual)
  const dispatch = useDispatch()
  const history = useHistory()

  const [page, setPage] = useState(0)

  const [email, setEmail] = useState("")
  const [passwd, setPasswd] = useState("")

  const linkedinResponse = queryString.parse(location.search)

  useEffect(() => {
    dispatch({ type: SET_INITIAL })
    persistor.purge()
  }, [dispatch])

  useEffect(() => {
    if (localStorage.linkedinCode && event.id) {
      const accessToken = localStorage.linkedinCode
      localStorage.removeItem("linkedinCode")

      dispatch(
        doLogin(
          {
            data: { access_token: accessToken },
            type: "linkedin",
            event_id: event.id
          },
          {
            onSuccess: () => getEventInformation(),
            onError: (err) => toast(err)
          }
        )
      )
    } // eslint-disable-next-line
  }, [event.id, dispatch])

  useEffect(() => {
    if (
      !isEmpty(linkedinResponse) &&
      !isEmpty(linkedinResponse.code) &&
      !isEmpty(linkedinResponse.state)
    ) {
      localStorage.setItem("linkedinCode", linkedinResponse.code)
      return <Redirect to={`/${linkedinResponse.state}`} />
    }
  }, [linkedinResponse])

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

  const handleSignUp = ({ user }) => {
    dispatch(
      doSignUp({ ...user, event_id: event.id }, () => {
        getEventInformation()
      })
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
      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENT_ID}&scope=r_liteprofile&state=${event.slug}&redirect_uri=${process.env.REACT_APP_LINKEDIN_REDIRECT_URI}`
    )
  }

  const getEventInformation = () => {
    if (event.id) {
      Promise.all([
        dispatch(getLivestream(event.id)),
        dispatch(getPrograms(event.id)),
        dispatch(getSpeakers(event.id)),
        dispatch(getAbstracts(event.id)),
        dispatch(getExhibitors(event.id)),
        dispatch(getSponsors(event.id))
      ])
        .then((res) => {
          // console.log(res)
          dispatch({ type: SHOW_TOP_MENU })
          history.push(`/${event.slug}`)
        })
        .catch((err) => {
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
        <h1>[seu logo aqui]</h1>
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
            <button
              onClick={() => !isUndefined(event.id) && setPage(1)}
              disabled={isUndefined(event.id)}
            >
              Acessar
            </button>
            {/* <button onClick={() => setPage(2)}>Cadastrar</button> */}
          </div>
        </footer>
      </>
    )
  }

  const renderLoginPage = () => {
    return (
      <>
        <div className="back-icon" onClick={() => setPage(0)}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="form-content">
          <p className="text">Acesse sua conta</p>

          <div className="social-media-buttons">
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              fields="name,email,picture"
              // render={({ onClick }) => (
              //   <button onClick={() => onClick(facebookCallback)}>
              //     <i className="fab fa-facebook" />
              //   </button>
              // )}
              // onFailure={() => toast("Não foi possível logar com seu Facebook")}
              disableMobileRedirect
              isMobile
              callback={responseFacebook}
              icon={<i className="fab fa-facebook" />}
              textButton=""
            />
            <button onClick={requestLinkedin}>
              <i className="fab fa-linkedin" />
            </button>
          </div>

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
            />
            <input
              type="password"
              placeholder="Senha"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
            />
          </form>

          <p className="forgot-signup">
            <span onClick={() => setPage(3)}>Esqueci minha senha</span>
            <span onClick={() => setPage(2)}>Cadastrar nova conta</span>
          </p>
        </div>
        <footer>
          <div className="buttons">
            <button onClick={handleLogin}>Entrar</button>
          </div>
        </footer>
      </>
    )
  }

  const renderSignUpPage = () => {
    return (
      <>
        <div className="back-icon" onClick={() => setPage(0)}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <footer>
          <div className="buttons">
            <button onClick={handleSignUp}>Cadastrar</button>
          </div>
        </footer>
      </>
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
      {page === 0 && renderMainPage()}
      {page === 1 && renderLoginPage()}
      {page === 2 && renderSignUpPage()}
    </div>
  )
}

export default Login
