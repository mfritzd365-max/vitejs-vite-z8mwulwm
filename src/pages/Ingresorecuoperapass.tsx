import React, { useState } from "react";
import "../styles/Ingresorecuoperapass.css";
import { useNavigate } from "react-router-dom";

import logo from "../Images/logo.jpg";
import fondo from "../Images/Fondopage.jpg";

const Ingresorecuoperapass: React.FC = () => {
  const navigate = useNavigate();
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarRepetirPassword, setMostrarRepetirPassword] =
    useState(false);

  const [modalAbierto, setModalAbierto] = useState(false);

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [guardando, setGuardando] = useState(false);


  /* =================================================
     CAMBIO CONTRASEÑA
  ================================================== */

  const manejarCambioPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setNuevaPassword(e.target.value);

    setError("");
    setMensaje("");
  };


  /* =================================================
     CAMBIO REPETIR CONTRASEÑA
  ================================================== */

  const manejarCambioRepetir = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setRepetirPassword(e.target.value);

    setError("");
    setMensaje("");
  };


  /* =================================================
     FORTALEZA PASSWORD
  ================================================== */

  const obtenerFortaleza = () => {

    if (!nuevaPassword) {
      return {
        nivel: 0,
        texto: ""
      };
    }

    let puntos = 0;

    if (nuevaPassword.length >= 8) {
      puntos++;
    }

    if (/[A-Z]/.test(nuevaPassword)) {
      puntos++;
    }

    if (/[a-z]/.test(nuevaPassword)) {
      puntos++;
    }

    if (/[0-9]/.test(nuevaPassword)) {
      puntos++;
    }

    if (/[^A-Za-z0-9]/.test(nuevaPassword)) {
      puntos++;
    }

    if (puntos <= 2) {
      return {
        nivel: 1,
        texto: "Contraseña débil"
      };
    }

    if (puntos <= 4) {
      return {
        nivel: 2,
        texto: "Contraseña segura"
      };
    }

    return {
      nivel: 3,
      texto: "Contraseña muy segura"
    };
  };


  const fortaleza = obtenerFortaleza();


  /* =================================================
     VALIDACIÓN
  ================================================== */

  const validarPassword = () => {

    if (!nuevaPassword.trim()) {
      return "Ingresa tu nueva contraseña.";
    }

    if (nuevaPassword.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }

    if (!/[A-Z]/.test(nuevaPassword)) {
      return "La contraseña debe contener al menos una letra mayúscula.";
    }

    if (!/[a-z]/.test(nuevaPassword)) {
      return "La contraseña debe contener al menos una letra minúscula.";
    }

    if (!/[0-9]/.test(nuevaPassword)) {
      return "La contraseña debe contener al menos un número.";
    }

    if (!/[^A-Za-z0-9]/.test(nuevaPassword)) {
      return "La contraseña debe contener al menos un carácter especial.";
    }

    if (!repetirPassword.trim()) {
      return "Repite tu nueva contraseña.";
    }

    if (nuevaPassword !== repetirPassword) {
      return "Las contraseñas no coinciden.";
    }

    return "";
  };


  /* =================================================
     ENVÍO
  ================================================== */

  const manejarEnvio = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");
    setMensaje("");

    const mensajeError = validarPassword();

    if (mensajeError) {

      setError(mensajeError);

      return;
    }

    setGuardando(true);

    /*
      Aquí posteriormente se conectará el backend.

      Ejemplo:

      await fetch("/api/auth/cambiar-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: nuevaPassword,
          token: token
        })
      });
    */

    setTimeout(() => {

      setGuardando(false);

      setMensaje(
        "Tu contraseña ha sido actualizada correctamente."
      );

      setNuevaPassword("");
      setRepetirPassword("");

    }, 1200);
  };


  /* =================================================
     CERRAR MODAL
  ================================================== */

  const cerrarModal = () => {

    setModalAbierto(false);
  };


  return (

    <main
      className="recuperacion-pass-page"
      style={{
        backgroundImage: `url(${fondo})`
      }}
    >

      {/* =================================================
          OVERLAY
      ================================================== */}

      <div className="recuperacion-pass-overlay" />


      {/* =================================================
          NAVBAR
      ================================================== */}

      <nav className="recuperacion-pass-navbar">

     <a href="/"> <img
            src={logo}
            alt="SOPIA"
          /></a>

         

        


        <button
          type="button"
          className="btn-ayuda"
          aria-label="Información sobre SOPIA"
          onClick={() => setModalAbierto(true)}
        >

          <span className="ayuda-icon">
            ?
          </span>

          <span className="ayuda-text">
            ¿Necesitas ayuda?
          </span>

        </button>

      </nav>


      {/* =================================================
          CONTENIDO
      ================================================== */}

      <section className="recuperacion-pass-content">

        <div className="recuperacion-pass-card">


          {/* =================================================
              ICONO
          ================================================== */}

          <div className="pass-icon">

            <i className="bi bi-shield-lock"></i>

          </div>


          {/* =================================================
              EYEBROW
          ================================================== */}

          <span className="pass-eyebrow">
            ACTUALIZACIÓN DE SEGURIDAD
          </span>


          {/* =================================================
              TITULO
          ================================================== */}

          <h1>
            Crea una nueva
            <span> contraseña.</span>
          </h1>


          {/* =================================================
              DESCRIPCIÓN
          ================================================== */}

          <p className="pass-description">

            Define una nueva contraseña para proteger
            el acceso a tu cuenta SOPIA.

          </p>


          {/* =================================================
              FORMULARIO
          ================================================== */}

          <form
            className="pass-form"
            onSubmit={manejarEnvio}
          >


            {/* =================================================
                NUEVA PASSWORD
            ================================================== */}

            <div className="pass-field">

              <input
                id="nuevaPassword"
                name="nuevaPassword"
                type={
                  mostrarPassword
                    ? "text"
                    : "password"
                }
                value={nuevaPassword}
                onChange={manejarCambioPassword}
                placeholder=" "
                autoComplete="new-password"
                required
              />

              <label htmlFor="nuevaPassword">
                Nueva contraseña
              </label>


              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setMostrarPassword(!mostrarPassword)
                }
                aria-label={
                  mostrarPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >

                <i
                  className={
                    mostrarPassword
                      ? "bi bi-eye-slash"
                      : "bi bi-eye"
                  }
                />

              </button>

            </div>


            {/* =================================================
                INDICADOR FORTALEZA
            ================================================== */}

            {nuevaPassword && (

              <div className="password-strength">

                <div className="strength-bars">

                  <span
                    className={
                      fortaleza.nivel >= 1
                        ? "active"
                        : ""
                    }
                  />

                  <span
                    className={
                      fortaleza.nivel >= 2
                        ? "active"
                        : ""
                    }
                  />

                  <span
                    className={
                      fortaleza.nivel >= 3
                        ? "active"
                        : ""
                    }
                  />

                </div>

                <span className="strength-text">
                  {fortaleza.texto}
                </span>

              </div>

            )}


            {/* =================================================
                REPETIR PASSWORD
            ================================================== */}

            <div className="pass-field">

              <input
                id="repetirPassword"
                name="repetirPassword"
                type={
                  mostrarRepetirPassword
                    ? "text"
                    : "password"
                }
                value={repetirPassword}
                onChange={manejarCambioRepetir}
                placeholder=" "
                autoComplete="new-password"
                required
              />

              <label htmlFor="repetirPassword">
                Repetir contraseña
              </label>


              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setMostrarRepetirPassword(
                    !mostrarRepetirPassword
                  )
                }
                aria-label={
                  mostrarRepetirPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >

                <i
                  className={
                    mostrarRepetirPassword
                      ? "bi bi-eye-slash"
                      : "bi bi-eye"
                  }
                />

              </button>

            </div>


            {/* =================================================
                VALIDACIÓN CONTRASEÑAS
            ================================================== */}

            {repetirPassword && (

              <div
                className={
                  nuevaPassword === repetirPassword
                    ? "password-match success"
                    : "password-match error"
                }
              >

                <i
                  className={
                    nuevaPassword === repetirPassword
                      ? "bi bi-check-circle"
                      : "bi bi-exclamation-circle"
                  }
                />

                <span>

                  {nuevaPassword === repetirPassword
                    ? "Las contraseñas coinciden."
                    : "Las contraseñas no coinciden."
                  }

                </span>

              </div>

            )}


            {/* =================================================
                REQUISITOS
            ================================================== */}

            <div className="password-requirements">

              <div className="requirements-title">

                <i className="bi bi-info-circle"></i>

                <span>
                  Tu contraseña debe contener:
                </span>

              </div>


              <div className="requirements-list">

                <span
                  className={
                    nuevaPassword.length >= 8
                      ? "requirement valid"
                      : "requirement"
                  }
                >

                  <i className="bi bi-check"></i>

                  8 caracteres mínimo

                </span>


                <span
                  className={
                    /[A-Z]/.test(nuevaPassword)
                      ? "requirement valid"
                      : "requirement"
                  }
                >

                  <i className="bi bi-check"></i>

                  Una mayúscula

                </span>


                <span
                  className={
                    /[0-9]/.test(nuevaPassword)
                      ? "requirement valid"
                      : "requirement"
                  }
                >

                  <i className="bi bi-check"></i>

                  Un número

                </span>


                <span
                  className={
                    /[^A-Za-z0-9]/.test(nuevaPassword)
                      ? "requirement valid"
                      : "requirement"
                  }
                >

                  <i className="bi bi-check"></i>

                  Un carácter especial

                </span>

              </div>

            </div>


            {/* =================================================
                ERROR
            ================================================== */}

            {error && (

              <div
                className="form-message form-error"
                role="alert"
              >

                <i className="bi bi-exclamation-circle"></i>

                <span>
                  {error}
                </span>

              </div>

            )}


            {/* =================================================
                SUCCESS
            ================================================== */}

            {mensaje && (

              <div
                className="form-message form-success"
                role="status"
              >

                <i className="bi bi-check-circle"></i>

                <span>
                  {mensaje}
                </span>

              </div>

            )}


            {/* =================================================
                BOTÓN
            ================================================== */}

            <button
              type="submit"
              className="btn-guardar-password"
              disabled={guardando}
            >

              {guardando ? (

                <>

                  <span className="spinner"></span>

                  Guardando...

                </>

              ) : (

                <>

                  Crear nueva contraseña

                  <span aria-hidden="true">
                    →
                  </span>

                </>

              )}

            </button>

          </form>


          {/* =================================================
              VOLVER
          ================================================== */}

          <div className="volver-login">

            <span>
              ¿Quieres volver al inicio?
            </span>

            <a href="/">
              Volver al inicio de sesión
              <span aria-hidden="true">
                →
              </span>
            </a>

          </div>


          {/* =================================================
              SEGURIDAD
          ================================================== */}

          <div className="security-info">

            <i className="bi bi-shield-check"></i>

            <span>
              Tu contraseña se mantiene protegida
            </span>

          </div>

        </div>

      </section>


      {/* =================================================
          FOOTER
      ================================================== */}

      <footer className="recuperacion-pass-footer">

        <span>
          © Copyright SOPIA 2026
        </span>

        <span>
          Conocimiento que impulsa a las empresas.
        </span>

      </footer>


      {/* =================================================
          MODAL SOPIA
      ================================================== */}

      {modalAbierto && (

        <div
          className="modal-backdrop"
          onMouseDown={(e) => {

            if (e.target === e.currentTarget) {
              cerrarModal();
            }

          }}
        >

          <section
            className="ayuda-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ayuda-title"
          >

            <button
              type="button"
              className="modal-close"
              onClick={cerrarModal}
              aria-label="Cerrar ventana"
            >

              <i className="bi bi-x-lg"></i>

            </button>


            <div className="modal-header">

            

              <h2 id="ayuda-title">

                El conocimiento de tu empresa,

                <span>
                  ahora más inteligente.
                </span>

              </h2>

              <p className="modal-intro">

                SOPIA transforma el conocimiento de tu organización
                en información accesible, organizada e inteligente,
                utilizando inteligencia artificial para ayudar a las
                personas a encontrar respuestas y tomar mejores decisiones.

              </p>

            </div>


            <div className="ayuda-cards">


              {/* CARD 1 */}

              <article className="ayuda-card">

                <div className="ayuda-card-top">

                  <div className="ayuda-card-icon">

                    <i className="bi bi-database"></i>

                  </div>

                  <span className="ayuda-card-number">
                    01
                  </span>

                </div>

                <h3>
                  Conocimiento centralizado
                </h3>

                <p>

                  Reúne documentos, procedimientos,
                  políticas, manuales y conocimiento
                  interno en un único espacio organizado.

                </p>

                <div className="ayuda-card-footer">

                  <i className="bi bi-check2-circle"></i>

                  <span>
                    Una única fuente de información
                  </span>

                </div>

              </article>


              {/* CARD 2 */}

              <article className="ayuda-card ayuda-card-featured">

                <div className="ayuda-card-glow"></div>

                <div className="ayuda-card-top">

                  <div className="ayuda-card-icon">

                    <i className="bi bi-search"></i>

                  </div>

                  <span className="ayuda-card-number">
                    02
                  </span>

                </div>

                <h3>
                  Encuentra respuestas rápidamente
                </h3>

                <p>

                  Reduce el tiempo dedicado a buscar
                  información y permite consultar el
                  conocimiento empresarial rápidamente.

                </p>

                <div className="ayuda-card-footer">

                  <i className="bi bi-lightning-charge"></i>

                  <span>
                    Información cuando la necesitas
                  </span>

                </div>

              </article>


              {/* CARD 3 */}

              <article className="ayuda-card ayuda-card-ai">

                <div className="ayuda-card-top">

                  <div className="ayuda-card-icon">

                    <i className="bi bi-stars"></i>

                  </div>

                  <span className="ayuda-card-number">
                    03
                  </span>

                </div>

                <h3>
                  Inteligencia artificial
                </h3>

                <p>

                  Convierte el conocimiento almacenado
                  en respuestas útiles mediante inteligencia
                  artificial y lenguaje natural.

                </p>

                <div className="ayuda-card-footer">

                  <i className="bi bi-robot"></i>

                  <span>
                    Conocimiento que conversa contigo
                  </span>

                </div>

              </article>

            </div>


            <div className="modal-highlight">

              <div className="modal-highlight-icon">

                <i className="bi bi-lightbulb"></i>

              </div>

              <div>

                <strong>
                  Convierte la información en conocimiento.
                </strong>

                <span>
                  Y el conocimiento en una ventaja para tu empresa.
                </span>

              </div>

            </div>


            <button
              type="button"
              className="btn-modal"
              onClick={cerrarModal}
            >

              Continuar

              <span aria-hidden="true">
                →
              </span>

            </button>

          </section>

        </div>

      )}

    </main>
  );
};

export default Ingresorecuoperapass;