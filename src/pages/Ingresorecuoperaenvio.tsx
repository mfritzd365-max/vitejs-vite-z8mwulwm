import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import '../styles/Ingresorecuoperaenvio.css';

import logo from '../Images/logo.jpg';
import fondo from '../Images/Fondopage.jpg';

const Ingresorecuoperaenvio: React.FC = () => {
  // =========================================================
  // REFERENCIA DEL FORMULARIO
  // =========================================================

  const form = useRef<HTMLFormElement>(null);

  // =========================================================
  // ESTADOS
  // =========================================================

  const [email, setEmail] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);

  // =========================================================
  // CAMBIO DEL EMAIL
  // =========================================================

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    setError('');
    setMensaje('');
  };

  // =========================================================
  // ENVÍO DEL CORREO
  // =========================================================

  const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    // =======================================================
    // VALIDACIÓN EMAIL VACÍO
    // =======================================================

    if (!email.trim()) {
      setError('Ingresa tu correo electrónico.');

      return;
    }

    // =======================================================
    // VALIDACIÓN FORMATO EMAIL
    // =======================================================

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Ingresa un correo electrónico válido.');

      return;
    }

    // =======================================================
    // VALIDACIÓN REFERENCIA FORM
    // =======================================================

    if (!form.current) {
      setError('No fue posible procesar el formulario.');

      return;
    }

    // =======================================================
    // ACTIVAR ESTADO DE ENVÍO
    // =======================================================

    setEnviando(true);

    try {
      // =====================================================
      // ENVÍO MEDIANTE EMAILJS SEND FORM
      // =====================================================

      const response = await emailjs.sendForm(
        'service_n87f45v',

        'template_gqwnj97',

        form.current,

        {
          publicKey: 'sbDxb8XcbGiReYmF_',
        }
      );

      // =====================================================
      // RESPUESTA EXITOSA
      // =====================================================

      console.log('EMAILJS SUCCESS:', response.status, response.text);

      setMensaje(
        'Si el correo está registrado, recibirás las instrucciones para recuperar tu contraseña.'
      );

      // Limpiar formulario
      setEmail('');
    } catch (error: any) {
      // =====================================================
      // ERROR EMAILJS
      // =====================================================

      console.error('EMAILJS ERROR:', error);

      console.error('EMAILJS ERROR TEXT:', error?.text);

      console.error('EMAILJS ERROR STATUS:', error?.status);

      setError(
        error?.text
          ? `No fue posible enviar el correo: ${error.text}`
          : 'No fue posible enviar el correo. Inténtalo nuevamente.'
      );
    } finally {
      setEnviando(false);
    }
  };

  // =========================================================
  // CERRAR MODAL
  // =========================================================

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main
      className="recuperacion-page"
      style={{
        backgroundImage: `url(${fondo})`,
      }}
    >
      {/* =====================================================
          OVERLAY
      ====================================================== */}

      <div className="recuperacion-overlay" />

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="recuperacion-navbar">
        <a href="/" aria-label="Ir al inicio de SOPIA">
          <img src={logo} alt="SOPIA" />
        </a>

        <button
          type="button"
          className="btn-ayuda"
          aria-label="Información sobre SOPIA"
          onClick={() => setModalAbierto(true)}
        >
          <span className="ayuda-icon">?</span>

          <span className="ayuda-text">¿Necesitas ayuda?</span>
        </button>
      </nav>

      {/* =====================================================
          CONTENIDO PRINCIPAL
      ====================================================== */}

      <section className="recuperacion-content">
        <div className="recuperacion-card">
          {/* =================================================
              ICONO
          ================================================== */}

          <div className="recuperacion-icon">
            <i className="bi bi-envelope-paper"></i>
          </div>

          {/* =================================================
              EYEBROW
          ================================================== */}

          <span className="recuperacion-eyebrow">RECUPERACIÓN DE ACCESO</span>

          {/* =================================================
              TÍTULO
          ================================================== */}

          <h1>
            Recupera el acceso
            <span> a tu cuenta.</span>
          </h1>

          {/* =================================================
              DESCRIPCIÓN
          ================================================== */}

          <p className="recuperacion-description">
            Ingresa el correo electrónico asociado a tu cuenta y te enviaremos
            las instrucciones para crear una nueva contraseña.
          </p>

          {/* =================================================
              FORMULARIO EMAILJS
          ================================================== */}

          <form
            ref={form}
            className="recuperacion-form"
            onSubmit={manejarEnvio}
          >
            {/* =================================================
                CAMPO EMAIL
            ================================================== */}

            <div className="field">
              <input
                id="email"
                name="user_email"
                type="email"
                value={email}
                onChange={manejarCambio}
                placeholder=" "
                autoComplete="email"
                disabled={enviando}
                required
              />

              <label htmlFor="email">Correo electrónico</label>
            </div>

            {/* =================================================
                NOMBRE DEL SISTEMA
                EmailJS lo recibe como from_name
            ================================================== */}

            <input type="hidden" name="from_name" value="SOPIA" readOnly />

            {/* =================================================
                ASUNTO
            ================================================== */}

            <input
              type="hidden"
              name="subject"
              value="Recuperación de contraseña"
              readOnly
            />

            {/* =================================================
                MENSAJE
            ================================================== */}

            <textarea
              name="message"
              value={`
Hemos recibido una solicitud para recuperar
el acceso a tu cuenta SOPIA.

Si realizaste esta solicitud, continúa con
el proceso de recuperación.

Si no reconoces esta solicitud, puedes
ignorar este correo.

© SOPIA 2026
Conocimiento que impulsa a las empresas.
              `}
              readOnly
              hidden
            />

            {/* =================================================
                EMAIL DESTINO
                Algunos templates utilizan to_email.
            ================================================== */}

            <input type="hidden" name="to_email" value={email} readOnly />

            {/* =================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="form-message form-error" role="alert">
                <i className="bi bi-exclamation-circle"></i>

                <span>{error}</span>
              </div>
            )}

            {/* =================================================
                ÉXITO
            ================================================== */}

            {mensaje && (
              <div className="form-message form-success" role="status">
                <i className="bi bi-check-circle"></i>

                <span>{mensaje}</span>
              </div>
            )}

            {/* =================================================
                BOTÓN
            ================================================== */}

            <button
              type="submit"
              className="btn-enviar-recuperacion"
              disabled={enviando}
            >
              {enviando ? (
                <>
                  <span className="spinner"></span>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar instrucciones
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </form>

          {/* =================================================
              VOLVER AL LOGIN
          ================================================== */}

          <div className="volver-login">
            <span>¿Recordaste tu contraseña?</span>

            <a href="/">
              Volver al inicio de sesión
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* =================================================
              SEGURIDAD
          ================================================== */}

          <div className="security-info">
            <i className="bi bi-shield-lock"></i>

            <span>Tu información está protegida</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="recuperacion-footer">
        <span>© Copyright SOPIA 2026</span>

        <span>Conocimiento que impulsa a las empresas.</span>
      </footer>

      {/* =====================================================
          MODAL SOPIA
      ====================================================== */}

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
            {/* =================================================
                CERRAR
            ================================================== */}

            <button
              type="button"
              className="modal-close"
              onClick={cerrarModal}
              aria-label="Cerrar ventana"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            {/* =================================================
                HEADER
            ================================================== */}

            <div className="modal-header">
              <div className="modal-brand-icon">
                <i className="bi bi-stars"></i>
              </div>

             

              <h2 id="ayuda-title">
                El conocimiento de tu empresa,
                <span> ahora más inteligente.</span>
              </h2>

              <p className="modal-intro">
                SOPIA transforma el conocimiento de tu organización en
                información accesible, organizada e inteligente, utilizando
                inteligencia artificial para ayudar a las personas a encontrar
                respuestas y tomar mejores decisiones.
              </p>
            </div>

            {/* =================================================
                CARDS
            ================================================== */}

            <div className="ayuda-cards">
              {/* CARD 1 */}

              <article className="ayuda-card">
                <div className="ayuda-card-top">
                  <div className="ayuda-card-icon">
                    <i className="bi bi-database"></i>
                  </div>

                  <span className="ayuda-card-number">01</span>
                </div>

                <h3>Conocimiento centralizado</h3>

                <p>
                  Reúne documentos, procedimientos, políticas, manuales y
                  conocimiento interno en un único espacio organizado y
                  disponible para tu empresa.
                </p>

                <div className="ayuda-card-footer">
                  <i className="bi bi-check2-circle"></i>

                  <span>Una única fuente de información</span>
                </div>
              </article>

              {/* CARD 2 */}

              <article className="ayuda-card ayuda-card-featured">
                <div className="ayuda-card-glow"></div>

                <div className="ayuda-card-top">
                  <div className="ayuda-card-icon">
                    <i className="bi bi-search"></i>
                  </div>

                  <span className="ayuda-card-number">02</span>
                </div>

                <h3>Encuentra respuestas rápidamente</h3>

                <p>
                  Reduce el tiempo que las personas necesitan para buscar
                  información. SOPIA permite consultar el conocimiento
                  empresarial de forma rápida y sencilla.
                </p>

                <div className="ayuda-card-footer">
                  <i className="bi bi-lightning-charge"></i>

                  <span>Información cuando la necesitas</span>
                </div>
              </article>

              {/* CARD 3 */}

              <article className="ayuda-card ayuda-card-ai">
                <div className="ayuda-card-top">
                  <div className="ayuda-card-icon">
                    <i className="bi bi-stars"></i>
                  </div>

                  <span className="ayuda-card-number">03</span>
                </div>

                <h3>Inteligencia artificial</h3>

                <p>
                  Convierte el conocimiento almacenado en respuestas útiles
                  mediante IA, ayudando a las personas a consultar información
                  empresarial utilizando lenguaje natural.
                </p>

                <div className="ayuda-card-footer">
                  <i className="bi bi-robot"></i>

                  <span>Conocimiento que conversa contigo</span>
                </div>
              </article>
            </div>

            {/* =================================================
                DESTACADO
            ================================================== */}

            <div className="modal-highlight">
              <div className="modal-highlight-icon">
                <i className="bi bi-lightbulb"></i>
              </div>

              <div>
                <strong>Convierte la información en conocimiento.</strong>

                <span>Y el conocimiento en una ventaja para tu empresa.</span>
              </div>
            </div>

            {/* =================================================
                CONTINUAR
            ================================================== */}

            <button type="button" className="btn-modal" onClick={cerrarModal}>
              Continuar
              <span aria-hidden="true">→</span>
            </button>
          </section>
        </div>
      )}
    </main>
  );
};

export default Ingresorecuoperaenvio;
