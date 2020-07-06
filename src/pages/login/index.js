import React, { useState, useEffect } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"

import { HIDE_TOP_MENU } from "../../actions/action_types"
import { doLogin } from "../../actions/auth_actions"

import bg from "../../images/bg_138.jpg"

const Login = () => {
  const event = useSelector((state) => state.event, shallowEqual)
  const dispatch = useDispatch()
  const history = useHistory()

  const [page, setPage] = useState(0)

  const [email, setEmail] = useState("")
  const [passwd, setPasswd] = useState("")

  useEffect(() => {
    dispatch({ type: HIDE_TOP_MENU })
  }, [dispatch])

  const handleLogin = () => {
    dispatch(
      doLogin(email, passwd, event.id, () => {
        history.push(`/${event.id}`)
      })
    )
  }

  const handleSignUp = () => {
    console.log("handleSignUp")
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
            <button onClick={() => setPage(1)}>Acessar</button>
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

          {/* <div className="social-media-buttons">
            <button onClick={() => console.log("facebook login")}>
              <i className="fab fa-facebook"></i>
            </button>
            <button onClick={() => console.log("linkedin login")}>
              <i className="fab fa-linkedin"></i>
            </button>
          </div>

          <p>OU</p> */}

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
