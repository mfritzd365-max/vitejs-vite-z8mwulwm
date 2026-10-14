import React, { useState } from "react";
import "../styles/registroempresa.css";

import logo from "../Images/logo.jpg";
import fondo from "../Images/Fondopage.jpg";

interface EmpresaForm {
  razonSocial: string;
  nombreComercial: string;
  rutEmpresa: string;
  giro: string;
  direccion: string;
  comuna: string;
  ciudad: string;
  telefonoEmpresa: string;
  emailEmpresa: string;
  nombreAdministrador: string;
  apellidoAdministrador: string;
  rutAdministrador: string;
  emailAdministrador: string;
  telefonoAdministrador: string;
  cargoAdministrador: string;
  password: string;
  confirmarPassword: string;
}

const initialForm: EmpresaForm = {
  razonSocial: "",
  nombreComercial: "",
  rutEmpresa: "",
  giro: "",
  direccion: "",
  comuna: "",
  ciudad: "",
  telefonoEmpresa: "",
  emailEmpresa: "",
  nombreAdministrador: "",
  apellidoAdministrador: "",
  rutAdministrador: "",
  emailAdministrador: "",
  telefonoAdministrador: "",
  cargoAdministrador: "",
  password: "",
  confirmarPassword: "",
};

const Registroempresa: React.FC = () => {
  const [form, setForm] = useState<EmpresaForm>(initialForm);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [registrando, setRegistrando] = useState(false);

  /* =========================================================
     CAMBIO DE CAMPOS
  ========================================================= */

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setMensaje("");
  };

  /* =========================================================
     FORTALEZA PASSWORD
  ========================================================= */

  const obtenerFortaleza = () => {
    if (!form.password) {
      return {
        nivel: 0,
        texto: "",
      };
    }

    let puntos = 0;

    if (form.password.length >= 8) puntos++;
    if (/[A-Z]/.test(form.password)) puntos++;
    if (/[a-z]/.test(form.password)) puntos++;
    if (/[0-9]/.test(form.password)) puntos++;
    if (/[^A-Za-z0-9]/.test(form.password)) puntos++;

    if (puntos <= 2) {
      return {
        nivel: 1,
        texto: "Contraseña débil",
      };
    }

    if (puntos <= 4) {
      return {
        nivel: 2,
        texto: "Contraseña segura",
      };
    }

    return {
      nivel: 3,
      texto: "Contraseña muy segura",
    };
  };

  const fortaleza = obtenerFortaleza();

  /* =========================================================
     VALIDACIÓN
  ========================================================= */

  const validarFormulario = () => {
    if (form.password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }

    if (!/[A-Z]/.test(form.password)) {
      return "La contraseña debe contener al menos una letra mayúscula.";
    }

    if (!/[a-z]/.test(form.password)) {
      return "La contraseña debe contener al menos una letra minúscula.";
    }

    if (!/[0-9]/.test(form.password)) {
      return "La contraseña debe contener al menos un número.";
    }

    if (!/[^A-Za-z0-9]/.test(form.password)) {
      return "La contraseña debe contener al menos un carácter especial.";
    }

    if (form.password !== form.confirmarPassword) {
      return "Las contraseñas ingresadas no coinciden.";
    }

    return "";
  };

  /* =========================================================
     ENVÍO
  ========================================================= */

  const manejarEnvio = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setMensaje("");

    const mensajeError = validarFormulario();

    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    setRegistrando(true);

    /*
      Aquí posteriormente se conectará el backend.

      IMPORTANTE:
      La contraseña no debe almacenarse directamente
      en el navegador ni en texto plano en SQL Server.
    */

    console.log("Datos del registro preparados", {
      ...form,
      password: "[OCULTA]",
      confirmarPassword: "[OCULTA]",
    });

    setTimeout(() => {
      setRegistrando(false);

      setMensaje(
        "Validación completada. El formulario está listo para conectarse al servicio de registro."
      );
    }, 1200);
  };

  /* =========================================================
     MODAL
  ========================================================= */

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  return (
    <main
      className="registroempresa-page"
      style={{
        backgroundImage: `url(${fondo})`,
      }}
    >

      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div className="registroempresa-overlay" />

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="registroempresa-navbar">

        <a
          href="/"
          className="registroempresa-logo"
          aria-label="SOPIA"
        >
          <img
            src={logo}
            alt="SOPIA"
          />
        </a>

        <button
          type="button"
          className="registroempresa-ayuda"
          onClick={() => setModalAbierto(true)}
          aria-label="Información sobre SOPIA"
        >
          <span className="registroempresa-ayuda-icon">
            ?
          </span>

          <span className="registroempresa-ayuda-text">
            ¿Necesitas ayuda?
          </span>
        </button>

      </nav>

      {/* =====================================================
          CONTENIDO
      ===================================================== */}

      <section className="registroempresa-content">

        <div className="registroempresa-card">

          {/* =================================================
              CABECERA
          ================================================= */}

          <div className="registroempresa-header">

            <div className="registroempresa-icon">

              <i className="bi bi-building-add"></i>

            </div>

            <span className="registroempresa-eyebrow">
              REGISTRO EMPRESARIAL
            </span>

            <h1>
              Dale a tu empresa
              <span> un nuevo conocimiento.</span>
            </h1>

            <p>
              Registra tu organización y crea un espacio inteligente
              para administrar, consultar y compartir su conocimiento.
            </p>

          </div>

          {/* =================================================
              FORMULARIO
          ================================================= */}

          <form
            className="registroempresa-form"
            onSubmit={manejarEnvio}
          >

            {/* =================================================
                SECCIÓN EMPRESA
            ================================================= */}

            <section className="registroempresa-section">

              <div className="registroempresa-section-heading">

                <div className="registroempresa-section-number">
                  01
                </div>

                <div>

                  <span className="section-kicker">
                    ORGANIZACIÓN
                  </span>

                  <h2>
                    Información de la empresa
                  </h2>

                  <p>
                    Cuéntanos sobre la organización que formará
                    parte de SOPIA.
                  </p>

                </div>

              </div>

              <div className="registroempresa-grid">

                <div className="registroempresa-field">
                  <input
                    id="razonSocial"
                    name="razonSocial"
                    value={form.razonSocial}
                    onChange={manejarCambio}
                    placeholder=" "
                    autoComplete="organization"
                    required
                  />
                  <label htmlFor="razonSocial">
                    Razón social *
                  </label>
                </div>

                <div className="registroempresa-field">
                  <input
                    id="nombreComercial"
                    name="nombreComercial"
                    value={form.nombreComercial}
                    onChange={manejarCambio}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="nombreComercial">
                    Nombre comercial *
                  </label>
                </div>

                <div className="registroempresa-field">
                  <input
                    id="rutEmpresa"
                    name="rutEmpresa"
                    value={form.rutEmpresa}
                    onChange={manejarCambio}
                    placeholder=" "
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="rutEmpresa">
                    RUT de la empresa *
                  </label>
                </div>

                <div className="registroempresa-field">
                  <input
                    id="giro"
                    name="giro"
                    value={form.giro}
                    onChange={manejarCambio}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="giro">
                    Giro comercial *
                  </label>
                </div>

                <div className="registroempresa-field registroempresa-full">
                  <input
                    id="direccion"
                    name="direccion"
                    value={form.direccion}
                    onChange={manejarCambio}
                    placeholder=" "
                    autoComplete="street-address"
                    required
                  />
                  <label htmlFor="direccion">
                    Dirección comercial *
                  </label>
                </div>

                <div className="registroempresa-field">
                  <input
                    id="comuna"
                    name="comuna"
                    value={form.comuna}
                    onChange={manejarCambio}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="comuna">
                    Comuna *
                  </label>
                </div>

                <div className="registroempresa-field">
                  <input
                    id="ciudad"
                    name="ciudad"
                    value={form.ciudad}
                    onChange={manejarCambio}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="ciudad">
                    Ciudad *
                  </label>
                </div>

                <div className="registroempresa-field">
                  <input
                    id="telefonoEmpresa"
                    name="telefonoEmpresa"
                    type="tel"
                    value={form.telefonoEmpresa}
                    onChange={manejarCambio}
                    placeholder=" "
                    autoComplete="tel"
                  />
                  <label htmlFor="telefonoEmpresa">
                    Teléfono de la empresa
                  </label>
                </div>

                <div className="registroempresa-field">
                  <input
                    id="emailEmpresa"
                    name="emailEmpresa"
                    type="email"
                    value={form.emailEmpresa}
                    onChange={manejarCambio}
                    placeholder=" "
                    autoComplete="email"
                    required
                  />
                  <label htmlFor="emailEmpresa">
                    Correo corporativo *
                  </label>
                </div>

              </div>

            </section>

            {/* =================================================
                SECCIÓN ADMINISTRADOR
            ================================================= */}

            <section className="registroempresa-section">

              <div className="registroempresa-section-heading">

                <div className="registroempresa-section-number">
                  02
                </div>

                <div>

                  <span className="section-kicker">
                    ADMINISTRACIÓN
                  </span>

                  <h2>
                    Datos del administrador
                  </h2>

                  <p>
                    Define la persona responsable de administrar
                    el espacio empresarial.
                  </p>

                </div>

              </div>

              <div className="registroempresa-grid">

                <div className="registroempresa-field">
                  <input
                    id="nombreAdministrador"
                    name="nombreAdministrador"
                    value={form.nombreAdministrador}
                    onChange={manejarCambio}
                    placeholder=" "
                    autoComplete="given-name"
                    required
                  />
                  <label htmlFor="nombreAdministrador">
                    Nombre *
                  </label>
                </div>

                <div className="registroempresa-field">
                  <input
                    id="apellidoAdministrador"
                    name="apellidoAdministrador"
                    value={form.apellidoAdministrador}
                    onChange={manejarCambio}
                    placeholder=" "
                    autoComplete="family-name"
                    required
                  />
                  <label htmlFor="apellidoAdministrador">
                    Apellidos *
                  </label>
                </div>

                <div className="registroempresa-field">
                  <input
                    id="rutAdministrador"
                    name="rutAdministrador"
                    value={form.rutAdministrador}
                    onChange={manejarCambio}
                    placeholder=" "
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="rutAdministrador">
                    RUT personal *
                  </label>
                </div>

                <div className="registroempresa-field">
                  <input
                    id="cargoAdministrador"
                    name="cargoAdministrador"
                    value={form.cargoAdministrador}
                    onChange={manejarCambio}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="cargoAdministrador">
                    Cargo en la empresa *
                  </label>
                </div>

                <div className="registroempresa-field">
                  <input
                    id="emailAdministrador"
                    name="emailAdministrador"
                    type="email"
                    value={form.emailAdministrador}
                    onChange={manejarCambio}
                    placeholder=" "
                    autoComplete="email"
                    required
                  />
                  <label htmlFor="emailAdministrador">
                    Correo del administrador *
                  </label>
                </div>

                <div className="registroempresa-field">
                  <input
                    id="telefonoAdministrador"
                    name="telefonoAdministrador"
                    type="tel"
                    value={form.telefonoAdministrador}
                    onChange={manejarCambio}
                    placeholder=" "
                    autoComplete="tel"
                    required
                  />
                  <label htmlFor="telefonoAdministrador">
                    Teléfono de contacto *
                  </label>
                </div>

                {/* PASSWORD */}

                <div className="registroempresa-field password-field">

                  <input
                    id="password"
                    name="password"
                    type={
                      mostrarPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={manejarCambio}
                    placeholder=" "
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />

                  <label htmlFor="password">
                    Crear contraseña *
                  </label>

                  <button
                    type="button"
                    className="registroempresa-password-toggle"
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

                {/* CONFIRMAR PASSWORD */}

                <div className="registroempresa-field password-field">

                  <input
                    id="confirmarPassword"
                    name="confirmarPassword"
                    type={
                      mostrarPassword
                        ? "text"
                        : "password"
                    }
                    value={form.confirmarPassword}
                    onChange={manejarCambio}
                    placeholder=" "
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />

                  <label htmlFor="confirmarPassword">
                    Confirmar contraseña *
                  </label>

                </div>

                {/* FORTALEZA */}

                {form.password && (
                  <div className="registroempresa-password-strength">

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

                    <span>
                      {fortaleza.texto}
                    </span>

                  </div>
                )}

                {/* COINCIDENCIA */}

                {form.confirmarPassword && (
                  <div
                    className={
                      form.password === form.confirmarPassword
                        ? "registroempresa-password-match success"
                        : "registroempresa-password-match error"
                    }
                  >

                    <i
                      className={
                        form.password === form.confirmarPassword
                          ? "bi bi-check-circle"
                          : "bi bi-exclamation-circle"
                      }
                    />

                    <span>
                      {form.password === form.confirmarPassword
                        ? "Las contraseñas coinciden."
                        : "Las contraseñas no coinciden."
                      }
                    </span>

                  </div>
                )}

                {/* REQUISITOS */}

                <div className="registroempresa-requirements">

                  <div className="requirements-title">

                    <i className="bi bi-shield-check"></i>

                    <span>
                      Tu contraseña debe contener:
                    </span>

                  </div>

                  <div className="requirements-list">

                    <span
                      className={
                        form.password.length >= 8
                          ? "requirement valid"
                          : "requirement"
                      }
                    >
                      <i className="bi bi-check"></i>
                      8 caracteres mínimo
                    </span>

                    <span
                      className={
                        /[A-Z]/.test(form.password)
                          ? "requirement valid"
                          : "requirement"
                      }
                    >
                      <i className="bi bi-check"></i>
                      Una mayúscula
                    </span>

                    <span
                      className={
                        /[0-9]/.test(form.password)
                          ? "requirement valid"
                          : "requirement"
                      }
                    >
                      <i className="bi bi-check"></i>
                      Un número
                    </span>

                    <span
                      className={
                        /[^A-Za-z0-9]/.test(form.password)
                          ? "requirement valid"
                          : "requirement"
                      }
                    >
                      <i className="bi bi-check"></i>
                      Un carácter especial
                    </span>

                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                MENSAJES
            ================================================= */}

            {error && (
              <div
                className="registroempresa-message error"
                role="alert"
              >
                <i className="bi bi-exclamation-circle"></i>

                <span>
                  {error}
                </span>
              </div>
            )}

            {mensaje && (
              <div
                className="registroempresa-message success"
                role="status"
              >
                <i className="bi bi-check-circle"></i>

                <span>
                  {mensaje}
                </span>
              </div>
            )}

            {/* =================================================
                ENVÍO
            ================================================= */}

            <div className="registroempresa-submit">

              <div className="registroempresa-submit-info">

                <i className="bi bi-lock"></i>

                <span>
                  Los campos marcados con * son obligatorios.
                  Tu información será tratada de forma segura.
                </span>

              </div>

              <button
                type="submit"
                className="registroempresa-button"
                disabled={registrando}
              >

                {registrando ? (
                  <>
                    <span className="registroempresa-spinner"></span>
                    Preparando registro...
                  </>
                ) : (
                  <>
                    Continuar con el registro
                    <span>→</span>
                  </>
                )}

              </button>

            </div>

          </form>

          {/* =================================================
              SEGURIDAD
          ================================================= */}

          <div className="registroempresa-security">

            <i className="bi bi-shield-check"></i>

            <span>
              Tus datos están protegidos durante el proceso de registro
            </span>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="registroempresa-footer">

        <span>
          © Copyright SOPIA 2026
        </span>

        <span>
          Conocimiento que impulsa a las empresas.
        </span>

      </footer>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {modalAbierto && (

        <div
          className="registroempresa-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              cerrarModal();
            }
          }}
        >

          <section
            className="registroempresa-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="registroempresa-modal-title"
          >

            <button
              type="button"
              className="registroempresa-modal-close"
              onClick={cerrarModal}
              aria-label="Cerrar ventana"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            <div className="registroempresa-modal-header">

              <span className="registroempresa-eyebrow">
                DESCUBRE SOPIA
              </span>

              <h2 id="registroempresa-modal-title">

                El conocimiento de tu empresa,

                <span>
                  ahora más inteligente.
                </span>

              </h2>

              <p>
                SOPIA transforma el conocimiento de tu organización
                en información accesible, organizada e inteligente,
                utilizando inteligencia artificial para ayudar a las
                personas a encontrar respuestas y tomar mejores decisiones.
              </p>

            </div>

            <div className="registroempresa-modal-cards">

              <article className="registroempresa-modal-card">

                <div className="modal-card-top">

                  <div className="modal-card-icon">
                    <i className="bi bi-database"></i>
                  </div>

                  <span>
                    01
                  </span>

                </div>

                <h3>
                  Conocimiento centralizado
                </h3>

                <p>
                  Reúne documentos, procedimientos, políticas,
                  manuales y conocimiento interno en un único
                  espacio organizado.
                </p>

                <div className="modal-card-footer">

                  <i className="bi bi-check2-circle"></i>

                  <span>
                    Una única fuente de información
                  </span>

                </div>

              </article>

              <article className="registroempresa-modal-card featured">

                <div className="modal-card-top">

                  <div className="modal-card-icon">
                    <i className="bi bi-search"></i>
                  </div>

                  <span>
                    02
                  </span>

                </div>

                <h3>
                  Encuentra respuestas rápidamente
                </h3>

                <p>
                  Reduce el tiempo dedicado a buscar información
                  y permite consultar el conocimiento empresarial
                  rápidamente.
                </p>

                <div className="modal-card-footer">

                  <i className="bi bi-lightning-charge"></i>

                  <span>
                    Información cuando la necesitas
                  </span>

                </div>

              </article>

              <article className="registroempresa-modal-card ai">

                <div className="modal-card-top">

                  <div className="modal-card-icon">
                    <i className="bi bi-stars"></i>
                  </div>

                  <span>
                    03
                  </span>

                </div>

                <h3>
                  Inteligencia artificial
                </h3>

                <p>
                  Convierte el conocimiento almacenado en
                  respuestas útiles mediante inteligencia artificial
                  y lenguaje natural.
                </p>

                <div className="modal-card-footer">

                  <i className="bi bi-robot"></i>

                  <span>
                    Conocimiento que conversa contigo
                  </span>

                </div>

              </article>

            </div>

            <div className="registroempresa-modal-highlight">

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
              className="registroempresa-modal-button"
              onClick={cerrarModal}
            >
              Continuar
              <span>→</span>
            </button>

          </section>

        </div>

      )}

    </main>
  );
};

export default Registroempresa;