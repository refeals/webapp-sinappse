import React from "react"

const Program = () => {
  return (
    <>
      <section id="viewer-programacao">
        <ul className="viewer-program phonescreen">
          <li>
            <i className="fa fa-spinner fa-spin"></i>
          </li>
        </ul>
      </section>
      <section id="viewer-talk"></section>
      <section id="viewer-asker">
        <div className="question-form">
          <div className="form-group">
            <label data-i18n="Seu nome">Seu nome</label>
            <input
              type="text"
              className="form-control"
              id="asker-name"
              placeholder="Seu nome"
              data-i18n="[placeholder]Seu nome"
            />
          </div>
          <div className="form-group">
            <label data-i18n="Sua pergunta">Sua pergunta</label>
            <textarea
              className="form-control"
              id="asker-question"
              placeholder="Sua pergunta"
              data-i18n="[placeholder]Sua pergunta"
              rows="6"
            ></textarea>
          </div>
          <div className="form-group text-center">
            <button
              className="btn btn-viewer btn-primary"
              id="asker-send"
              data-i18n="Enviar"
            >
              Enviar
            </button>
            <button
              className="asker-cancel btn btn-viewer btn-danger"
              onClick={() =>
                console.log(
                  "document.getElementById('viewer-asker').classList.remove('active')"
                )
              }
              data-i18n="Cancelar"
            >
              Cancelar
            </button>
          </div>
        </div>
      </section>
      <section id="viewer-eval">
        <div className="question-form">
          <div className="form-group">
            <span data-i18n="Deseja enviar a avaliação de">
              Deseja enviar a avaliação de
            </span>
            <span className="eval-count"></span>
            <span data-i18n="estrela(s)">estrela(s)?</span>
          </div>
          <div className="form-group text-center">
            <button
              className="btn btn-viewer btn-primary"
              id="eval-send"
              data-i18n="Enviar"
            >
              Enviar
            </button>
            <button
              className="eval-cancel btn btn-viewer btn-danger"
              onClick={() =>
                console.log(
                  "document.getElementById('viewer-eval').classList.remove('active')"
                )
              }
              data-i18n="Cancelar"
            >
              Cancelar
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Program
