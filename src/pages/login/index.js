import { isUndefined } from "lodash"
import React, { useEffect, useState } from "react"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { getAbstracts } from "../../actions/abstract_actions"
import { SET_INITIAL, SHOW_TOP_MENU } from "../../actions/action_types"
import { doLogin } from "../../actions/auth_actions"
import { getExhibitors } from "../../actions/exhibitor_actions"
import { getLivestream } from "../../actions/livestream_actions"
import { getPrograms } from "../../actions/programs_actions"
import { getSpeakers } from "../../actions/speaker_actions"
import { getSponsors } from "../../actions/sponsor_actions"
import bg from "../../images/bg_138.jpg"
import { persistor } from "../../store"

const Login = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const dispatch = useDispatch()
  const history = useHistory()

  const [page, setPage] = useState(0)

  const [email, setEmail] = useState("")
  const [passwd, setPasswd] = useState("")

  useEffect(() => {
    dispatch({ type: SET_INITIAL })
    persistor.purge()
  }, [dispatch])

  const handleLogin = () => {
    dispatch(
      doLogin(email, passwd, event.slug, () => {
        getEventInformation()
      })
    )
  }

  const handleSignUp = () => {
    console.log("handleSignUp")
  }

  const facebookCallback = (response) => {
    console.log(response)
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
              render={({ onClick }) => (
                <button onClick={() => onClick(facebookCallback)}>
                  <i className="fab fa-facebook" />
                </button>
              )}
              onFailure={() => toast("Não foi possível logar com seu Facebook")}
            />
            <button onClick={() => console.log("linkedin login")}>
              <i className="fab fa-linkedin"></i>
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
