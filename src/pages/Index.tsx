import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Index.css";

import logo from "../Images/logo.jpg";
import fondo from "../Images/Fondopage.jpg";

const Index: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // VALIDACIÓN TEMPORAL PARA PRUEBAS
    const usuarioValido = "ext_mafritz@sopia.cl";
    const passwordValida = "Marcosis1110.";

    if (
      email.trim().toLowerCase() === usuarioValido &&
      password === passwordValida
    ) {
      // Ruta provisional. La página todavía no existe.
      navigate("/dashboard");
    } else {
      // Mostrar modal de credenciales incorrectas
      setMostrarModal(true);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="background-overlay"></div>

      <div className="login-container">
        {/* COLUMNA IZQUIERDA */}
        <div className="login-info">
          <div className="welcome-text">
            <span className="small-title">
              PLATAFORMA EMPRESARIAL
            </span>

            <h1>
              Gestiona el conocimiento
              <br />
              de tu empresa.
            </h1>

            <p>
              Centraliza, organiza y encuentra la información
              que tu organización necesita en un solo lugar.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="bi bi-database"></i>
            </div>

            <div>
              <h3>Conocimiento centralizado</h3>
              <p>
                Mantén documentos, procedimientos, información
                y conocimiento empresarial organizados en un
                único lugar.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="bi bi-robot"></i>
            </div>

            <div>
              <h3>Inteligencia empresarial</h3>
              <p>
                Consulta la información de tu organización de
                manera rápida utilizando herramientas
                inteligentes de búsqueda y análisis.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="bi bi-shield-check"></i>
            </div>

            <div>
              <h3>Información segura</h3>
              <p>
                Cada empresa mantiene su información aislada
                y protegida, respetando los permisos y roles
                de sus usuarios.
              </p>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="login-form-container">
          <div className="login-card">
            <div className="logo-container">
              <img
                src={logo}
                alt="Logo SOPIA"
                className="login-logo"
              />
            </div>

            <div className="login-header">
              <h2>Bienvenido</h2>
              <p>Ingresa a tu espacio empresarial</p>
            </div>

            <form onSubmit={handleLogin}>
              {/* CORREO */}
              <div className="input-group-modern">
                <i className="bi bi-envelope"></i>

                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  autoComplete="username"
                  required
                />

                <label htmlFor="email">Mail usuario</label>
              </div>

              {/* CONTRASEÑA */}
              <div className="input-group-modern">
                <i className="bi bi-lock"></i>

                <input
                  type={mostrarPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  autoComplete="current-password"
                  required
                />

                <label htmlFor="password">
                  Password usuario
                </label>

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setMostrarPassword((anterior) => !anterior)
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
                  ></i>
                </button>
              </div>

              {/* OPCIONES */}
              <div className="login-options">
                <label className="remember-user">
                  <input type="checkbox" />
                  <span>Recordarme</span>
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    navigate("/Ingresorecuoperaenvio")
                  }
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* INGRESAR */}
             {/* INGRESAR */}
             <button
                  type="submit"
                  className="login-button"
                  disabled={cargando}
                >
                  <span className="login-button-text">
                    {cargando ? "Validando..." : "Ingresar"}
                  </span>

                  {cargando ? (
                    <span
                      className="login-spinner"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="bi bi-arrow-right login-button-icon"
                      aria-hidden="true"
                    />
                  )}
                </button>
            </form>

            <div className="login-footer">
              <span>
                ¿Tu empresa aún no está registrada?
              </span>

              <button
                type="button"
                onClick={() => navigate("/registroempresa")}
              >
                Crear empresa
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE CREDENCIALES INCORRECTAS */}
      {mostrarModal && (
        <div
          className="login-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              cerrarModal();
            }
          }}
        >
          <div
            className="login-error-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="login-error-title"
            aria-describedby="login-error-description"
          >
            <div className="login-error-icon">
              <i className="bi bi-shield-lock"></i>
            </div>

            <h2 id="login-error-title">
              No pudimos iniciar sesión
            </h2>

            <p id="login-error-description">
              El correo electrónico o la contraseña son
              incorrectos. Verifica tus credenciales e
              inténtalo nuevamente.
            </p>

            <button
              type="button"
              className="login-error-button"
              onClick={cerrarModal}
              autoFocus
            >
              <i className="bi bi-arrow-left"></i>
              Volver a intentarlo
            </button>

            <div className="login-error-footer">
              <i className="bi bi-lock-fill"></i>
              Tu espacio empresarial te espera
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;