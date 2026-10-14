import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Building2,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  LogOut,
  UserRound,
  Share2,
  FileText,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  BookOpen,
  LockKeyhole,
  CheckCircle2,
  LayoutDashboard,
  Copy,
  Bot,
  Send,
  Lightbulb,
  CircleHelp,
  Wrench,
  Clock3,
  AlertCircle,
} from "lucide-react";

import "../styles/Homeconocimiento.css";
import logo from "../Images/logo.jpg";
import fondo from "../Images/Fondopage.jpg";

type TipoConocimiento = "Problema" | "Solución" | "Mejora" | "Sugerencia";

type AreaEmpresa = {
  nombre: string;
  descripcion: string;
  icono: React.ElementType;
};

const AREAS: AreaEmpresa[] = [
  {
    nombre: "Gerencia",
    descripcion: "Dirección y gestión",
    icono: LayoutDashboard,
  },
  {
    nombre: "Tecnología",
    descripcion: "Sistemas y soporte técnico",
    icono: Building2,
  },
  {
    nombre: "Contabilidad",
    descripcion: "Procesos contables",
    icono: FileText,
  },
  {
    nombre: "Soporte",
    descripcion: "Atención y asistencia",
    icono: CircleHelp,
  },
  {
    nombre: "Producción",
    descripcion: "Procesos operativos",
    icono: Wrench,
  },
  {
    nombre: "Ventas",
    descripcion: "Gestión comercial",
    icono: MessageSquareText,
  },
  {
    nombre: "Despachos",
    descripcion: "Distribución y entregas",
    icono: Send,
  },
  {
    nombre: "RRHH",
    descripcion: "Personas y organización",
    icono: UserRound,
  },
];

const TIPOS_CONOCIMIENTO: {
  nombre: TipoConocimiento;
  descripcion: string;
  icono: React.ElementType;
}[] = [
  {
    nombre: "Problema",
    descripcion: "Documenta una dificultad o incidencia.",
    icono: AlertCircle,
  },
  {
    nombre: "Solución",
    descripcion: "Comparte cómo resolviste un problema.",
    icono: CheckCircle2,
  },
  {
    nombre: "Mejora",
    descripcion: "Propón una forma mejor de trabajar.",
    icono: Lightbulb,
  },
  {
    nombre: "Sugerencia",
    descripcion: "Comparte una idea para el equipo.",
    icono: MessageSquareText,
  },
];

const Homeconocimiento: React.FC = () => {
  const navigate = useNavigate();

  /*
   * Datos demostrativos de sesión.
   * En producción, deben obtenerse de la sesión autenticada.
   */
  const usuario = {
    nombre: "Usuario SOPIA",
    email: "ext_mafritz@sopia.cl",
    cargo: "Gestor de conocimiento",
    area: "Tecnología",
  };

  const [areaActiva, setAreaActiva] = useState(usuario.area);
  const [sidebarContraido, setSidebarContraido] = useState(false);
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [preguntaEnviada, setPreguntaEnviada] = useState("");
  const [respuestaIA, setRespuestaIA] = useState("");
  const [consultandoIA, setConsultandoIA] = useState(false);
  const [estadoConsulta, setEstadoConsulta] = useState<
    "inicial" | "pendiente" | "error" | "respuesta"
  >("inicial");

  const [modalCompartirAbierto, setModalCompartirAbierto] = useState(false);
  const [tipoConocimiento, setTipoConocimiento] =
    useState<TipoConocimiento>("Solución");
  const [tituloConocimiento, setTituloConocimiento] = useState("");
  const [detalleConocimiento, setDetalleConocimiento] = useState("");
  const [pasosConocimiento, setPasosConocimiento] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errorFormulario, setErrorFormulario] = useState("");

  const esMiArea = areaActiva === usuario.area;
  const areaSeleccionada = AREAS.find(
    (area) => area.nombre === areaActiva
  );
  const IconoArea = areaSeleccionada?.icono ?? Building2;

  const seleccionarArea = (nombre: string) => {
    setAreaActiva(nombre);
    setSidebarAbierto(false);
    setBusqueda("");
    setPreguntaEnviada("");
    setRespuestaIA("");
    setEstadoConsulta("inicial");
    setMensaje("");
  };

  const consultarSopia = async () => {
    const pregunta = busqueda.trim();

    if (!pregunta) {
      setEstadoConsulta("error");
      setMensaje("Escribe una pregunta antes de consultar.");
      return;
    }

    setPreguntaEnviada(pregunta);
    setRespuestaIA("");
    setConsultandoIA(true);
    setEstadoConsulta("pendiente");
    setMensaje("");

    /*
     * Integración pendiente:
     * aquí se conectará el endpoint del backend que validará
     * IdEmpresa, permisos y acceso al conocimiento del área.
     *
     * No se genera una respuesta ficticia en el navegador.
     */
    setConsultandoIA(false);
    setEstadoConsulta("pendiente");
    setMensaje(
      "La pregunta está preparada. Para obtener una respuesta real, conecta este panel con el servicio de IA de SOPIA."
    );
  };

  const copiarRespuesta = async () => {
    if (!respuestaIA.trim()) return;

    try {
      await navigator.clipboard.writeText(respuestaIA);
      setMensaje("Respuesta copiada al portapapeles.");
    } catch {
      setMensaje("No fue posible copiar la respuesta en este dispositivo.");
    }
  };

  const abrirModalCompartir = () => {
    if (!esMiArea) {
      setMensaje(
        `Solo puedes compartir conocimientos en tu área: ${usuario.area}.`
      );
      return;
    }

    setTipoConocimiento("Solución");
    setTituloConocimiento("");
    setDetalleConocimiento("");
    setPasosConocimiento("");
    setErrorFormulario("");
    setModalCompartirAbierto(true);
    setMensaje("");
  };

  const cerrarModalCompartir = () => {
    setModalCompartirAbierto(false);
    setErrorFormulario("");
  };

  const publicarConocimiento = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!esMiArea) {
      setErrorFormulario(
        `No puedes publicar en ${areaActiva}. Tu área autorizada es ${usuario.area}.`
      );
      return;
    }

    if (tituloConocimiento.trim().length < 5) {
      setErrorFormulario("El título debe tener al menos 5 caracteres.");
      return;
    }

    if (detalleConocimiento.trim().length < 15) {
      setErrorFormulario(
        "Describe el conocimiento con al menos 15 caracteres."
      );
      return;
    }

    /*
     * Pendiente de integración con el backend.
     * No se afirma que el conocimiento se haya guardado.
     */
    setErrorFormulario("");
    setModalCompartirAbierto(false);
    setMensaje(
      "El formulario está validado. Conecta el servicio de publicación para guardar este conocimiento."
    );
  };

  const cerrarSesion = () => {
    /*
     * Integra aquí la limpieza de la sesión/token cuando
     * esté conectado el sistema de autenticación.
     */
    setMenuUsuarioAbierto(false);
    navigate("/");
  };

  return (
    <div
      className="hc-page"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="hc-background-overlay" />

      {/* BARRA SUPERIOR */}
      <header className="hc-topbar">
        <div className="hc-topbar-left">
          <button
            type="button"
            className="hc-mobile-menu-button"
            onClick={() => setSidebarAbierto(!sidebarAbierto)}
            aria-label={sidebarAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={sidebarAbierto}
          >
            {sidebarAbierto ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button
            type="button"
            className="hc-brand"
            onClick={() => navigate("/Homempresa")}
            aria-label="Ir al inicio de SOPIA"
          >
            <img src={logo} alt="SOPIA" className="hc-brand-logo" />
            <span className="hc-brand-divider" />
            <span className="hc-brand-name">SOPIA</span>
          </button>

          <div className="hc-topbar-context">
            <span className="hc-context-dot" />
            <span>Gestión del conocimiento</span>
          </div>
        </div>

        <div className="hc-topbar-actions">
          <button
            type="button"
            className="hc-icon-button"
            aria-label="Notificaciones"
            onClick={() =>
              setMensaje("Las notificaciones estarán disponibles próximamente.")
            }
          >
            <Bell size={19} />
          </button>

          <div className="hc-topbar-separator" />

          <div className="hc-user-menu-container">
            <button
              type="button"
              className="hc-user-trigger"
              onClick={() => setMenuUsuarioAbierto(!menuUsuarioAbierto)}
              aria-expanded={menuUsuarioAbierto}
              aria-label="Abrir menú de usuario"
            >
              <span className="hc-user-avatar">
                <UserRound size={19} />
              </span>

              <span className="hc-user-info">
                <strong>{usuario.nombre}</strong>
                <small>{usuario.area}</small>
              </span>

              <ChevronRight
                size={16}
                className={`hc-user-chevron ${
                  menuUsuarioAbierto ? "hc-user-chevron-open" : ""
                }`}
              />
            </button>

            {menuUsuarioAbierto && (
              <div className="hc-user-dropdown">
                <div className="hc-dropdown-profile">
                  <strong>{usuario.nombre}</strong>
                  <span>{usuario.email}</span>
                  <small>{usuario.cargo}</small>
                </div>

                <div className="hc-dropdown-divider" />

                <div className="hc-dropdown-area">
                  <Building2 size={16} />
                  <span>Área: {usuario.area}</span>
                </div>

                <button
                  type="button"
                  className="hc-dropdown-logout"
                  onClick={cerrarSesion}
                >
                  <LogOut size={17} />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ESTRUCTURA PRINCIPAL */}
      <div className="hc-layout">
        {sidebarAbierto && (
          <button
            type="button"
            className="hc-mobile-backdrop"
            aria-label="Cerrar menú lateral"
            onClick={() => setSidebarAbierto(false)}
          />
        )}

        {/* MENÚ LATERAL */}
        <aside
          className={[
            "hc-sidebar",
            sidebarContraido ? "hc-sidebar-collapsed" : "",
            sidebarAbierto ? "hc-sidebar-open" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="hc-sidebar-top">
            <div className="hc-sidebar-heading">
              <span className="hc-sidebar-overline">ESPACIO DE TRABAJO</span>
              <h2>Áreas</h2>
              <p>Explora el conocimiento de tu empresa.</p>
            </div>

            <button
              type="button"
              className="hc-sidebar-collapse-button"
              onClick={() => setSidebarContraido(!sidebarContraido)}
              aria-label={
                sidebarContraido
                  ? "Expandir menú lateral"
                  : "Contraer menú lateral"
              }
              title={
                sidebarContraido
                  ? "Expandir menú"
                  : "Contraer menú"
              }
            >
              {sidebarContraido ? (
                <ChevronRight size={19} />
              ) : (
                <ChevronLeft size={19} />
              )}
            </button>
          </div>

          <div className="hc-sidebar-section-label">
            <span>DEPARTAMENTOS</span>
          </div>

          <nav className="hc-area-navigation" aria-label="Áreas de la empresa">
            {AREAS.map((area) => {
              const Icono = area.icono;
              const activa = areaActiva === area.nombre;
              const propia = usuario.area === area.nombre;

              return (
                <button
                  type="button"
                  key={area.nombre}
                  className={[
                    "hc-area-link",
                    activa ? "hc-area-active" : "",
                    propia ? "hc-area-own" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => seleccionarArea(area.nombre)}
                  title={
                    sidebarContraido
                      ? `${area.nombre}${propia ? " · TU ÁREA" : ""}`
                      : undefined
                  }
                  aria-current={activa ? "page" : undefined}
                >
                  <span className="hc-area-icon">
                    <Icono size={19} strokeWidth={1.8} />
                  </span>

                  <span className="hc-area-copy">
                    <span className="hc-area-name">{area.nombre}</span>
                    <span className="hc-area-description">
                      {area.descripcion}
                    </span>
                  </span>

                  {propia && (
                    <span className="hc-area-own-badge">TU ÁREA</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hc-sidebar-bottom">
            <div className="hc-sidebar-security">
              <span className="hc-security-icon">
                <ShieldCheck size={18} />
              </span>

              <div className="hc-security-copy">
                <strong>Espacio protegido</strong>
                <span>Acceso según permisos</span>
              </div>
            </div>

            <div className="hc-sidebar-footer">
              <span className="hc-sidebar-footer-mark">S</span>
              <span className="hc-sidebar-footer-copy">
                SOPIA · 2026
              </span>
            </div>
          </div>
        </aside>

        {/* CONTENIDO CENTRAL */}
        <main className="hc-main">
          <div className="hc-main-inner">
            {/* ENCABEZADO DE PÁGINA */}
            <section className="hc-welcome">
              <div className="hc-breadcrumb">
                <span>Inicio</span>
                <ChevronRight size={14} />
                <span>Conocimiento</span>
                <ChevronRight size={14} />
                <strong>{areaActiva}</strong>
              </div>

              <div className="hc-welcome-content">
                <div className="hc-welcome-copy">
                  <div className="hc-eyebrow">
                    <Sparkles size={15} />
                    <span>CONOCIMIENTO QUE GENERA VALOR</span>
                  </div>

                  <h1>
                    Tu conocimiento,
                    <br />
                    <span>una solución para todos.</span>
                  </h1>

                  <p>
                    Encuentra respuestas, aprende de otras áreas y transforma
                    la experiencia de tu equipo en conocimiento compartido.
                  </p>
                </div>

                <div className="hc-welcome-illustration" aria-hidden="true">
                  <div className="hc-illustration-glow" />
                  <div className="hc-illustration-card hc-illustration-card-back">
                    <BookOpen size={27} />
                  </div>
                  <div className="hc-illustration-card hc-illustration-card-front">
                    <Sparkles size={33} />
                  </div>
                  <span className="hc-illustration-orbit hc-orbit-one" />
                  <span className="hc-illustration-orbit hc-orbit-two" />
                </div>
              </div>
            </section>

            {/* ÁREA SELECCIONADA */}
            <section className="hc-area-banner">
              <div className="hc-area-banner-icon">
                <IconoArea size={23} />
              </div>

              <div className="hc-area-banner-copy">
                <span>ÁREA SELECCIONADA</span>
                <h2>{areaActiva}</h2>
                <p>
                  {esMiArea
                    ? "Esta es tu área de trabajo. Puedes consultar y compartir conocimiento."
                    : "Puedes consultar esta área según tus permisos. La publicación está reservada a tu propia área."}
                </p>
              </div>

              {esMiArea ? (
                <span className="hc-area-banner-badge hc-badge-own">
                  <CheckCircle2 size={15} />
                  TU ÁREA
                </span>
              ) : (
                <span className="hc-area-banner-badge hc-badge-readonly">
                  <BookOpen size={15} />
                  CONSULTA
                </span>
              )}
            </section>

            {/* BUSCADOR */}
            

            {/* PANEL DE RESPUESTA INTELIGENTE */}
            <section className="hc-ai-panel">
              <div className="hc-ai-header">
                <div className="hc-ai-brand">
                  <div className="hc-ai-logo">
                    <Sparkles size={23} />
                  </div>

                  <div className="hc-ai-heading">
                    <div className="hc-ai-title-row">
                      <h2>Respuesta inteligente</h2>
                      <span className="hc-ai-badge">
                        <span className="hc-ai-status-dot" />
                        SOPIA AI
                      </span>
                    </div>

                    <p>
                      Respuestas basadas en el conocimiento autorizado de tu
                      organización.
                    </p>
                  </div>
                </div>

                <div className="hc-ai-area">
                  <Building2 size={15} />
                  <span>{areaActiva}</span>
                </div>
              </div>

              <div className="hc-ai-divider" />

              <div className="hc-ai-question">
                <div className="hc-ai-section-label">
                  <MessageSquareText size={16} />
                  <span>TU CONSULTA</span>
                </div>

                <div className="hc-ai-question-box">
                  <textarea
                    value={busqueda}
                    onChange={(event) => setBusqueda(event.target.value)}
                    placeholder="Escribe tu pregunta. Ej.: ¿Cuál es el procedimiento para resolver esta incidencia?"
                    rows={3}
                    aria-label="Pregunta para la inteligencia artificial"
                  />

                  <div className="hc-ai-question-footer">
                    <span>
                      <LockKeyhole size={14} />
                      Consulta limitada por permisos de acceso
                    </span>

                    <button
                      type="button"
                      className="hc-ai-ask-button"
                      disabled={!busqueda.trim() || consultandoIA}
                      onClick={() => void consultarSopia()}
                    >
                      <Sparkles size={17} />
                      {consultandoIA ? "Consultando..." : "Consultar a SOPIA"}
                      <Send size={15} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="hc-ai-answer">
                <div className="hc-ai-answer-heading">
                  <div className="hc-ai-answer-icon">
                    <Bot size={21} />
                  </div>

                  <div className="hc-ai-answer-title">
                    <strong>La respuesta de SOPIA</strong>
                    <span>
                      {estadoConsulta === "respuesta"
                        ? "Respuesta generada"
                        : estadoConsulta === "pendiente"
                          ? "Consulta preparada"
                          : estadoConsulta === "error"
                            ? "Revisa tu consulta"
                            : "Tu respuesta aparecerá en este espacio"}
                    </span>
                  </div>

                  {respuestaIA && (
                    <button
                      type="button"
                      className="hc-ai-copy-button"
                      onClick={() => void copiarRespuesta()}
                      title="Copiar respuesta"
                    >
                      <Copy size={16} />
                      Copiar
                    </button>
                  )}
                </div>

                {estadoConsulta === "inicial" && (
                  <div className="hc-ai-empty-state">
                    <div className="hc-ai-empty-icon">
                      <BookOpen size={25} />
                    </div>
                    <strong>Tu próxima respuesta comienza con una pregunta</strong>
                    <p>
                      Escribe lo que necesitas saber. Aquí aparecerá la
                      respuesta generada cuando conectemos el servicio de IA
                      con la base de conocimiento de SOPIA.
                    </p>
                    <div className="hc-ai-empty-features">
                      <span>
                        <ShieldCheck size={15} />
                        Acceso controlado
                      </span>
                      <span>
                        <FileText size={15} />
                        Fuentes documentales
                      </span>
                    </div>
                  </div>
                )}

                {estadoConsulta === "pendiente" && (
                  <div className="hc-ai-status-panel">
                    <div className="hc-ai-status-panel-icon">
                      <Clock3 size={23} />
                    </div>
                    <div>
                      <strong>Consulta preparada</strong>
                      <p>
                        {mensaje ||
                          "La conexión con el servicio de IA todavía no está configurada."}
                      </p>
                    </div>
                  </div>
                )}

                {estadoConsulta === "error" && (
                  <div className="hc-ai-status-panel hc-ai-error-panel">
                    <div className="hc-ai-status-panel-icon">
                      <AlertCircle size={23} />
                    </div>
                    <div>
                      <strong>No se pudo realizar la consulta</strong>
                      <p>{mensaje}</p>
                    </div>
                  </div>
                )}

                {respuestaIA && (
                  <textarea
                    className="hc-ai-response-textarea"
                    value={respuestaIA}
                    readOnly
                    rows={8}
                    placeholder="La respuesta de SOPIA aparecerá aquí."
                    aria-label="Respuesta generada por SOPIA"
                  />
                )}

                {preguntaEnviada && (
                  <div className="hc-ai-question-summary">
                    <span>Última pregunta</span>
                    <p>{preguntaEnviada}</p>
                  </div>
                )}

                <div className="hc-ai-answer-footer">
                  <div className="hc-ai-disclaimer">
                    <ShieldCheck size={16} />
                    <span>
                      Verifica las respuestas importantes con la documentación
                      oficial.
                    </span>
                  </div>

                  <div className="hc-ai-powered">
                    <Sparkles size={14} />
                    Impulsado por IA
                  </div>
                </div>
              </div>
            </section>

            {/* ACCIONES DE CONOCIMIENTO */}
            <section className="hc-share-section">
              <div className="hc-share-card">
                <div className="hc-share-icon">
                  <Share2 size={23} />
                </div>

                <div className="hc-share-copy">
                  <span className="hc-share-eyebrow">
                    CONOCIMIENTO COLABORATIVO
                  </span>
                  <h3>¿Encontraste una solución útil?</h3>
                  <p>
                    Documenta tu experiencia para que otras personas de tu
                    área puedan aprovecharla.
                  </p>
                  <div className="hc-share-permission">
                    <LockKeyhole size={14} />
                    {`Publicación autorizada únicamente en ${usuario.area}`}
                  </div>
                </div>

                <button
                  type="button"
                  className="hc-share-button"
                  onClick={abrirModalCompartir}
                  disabled={!esMiArea}
                  title={
                    esMiArea
                      ? "Compartir conocimiento"
                      : `Solo puedes publicar en ${usuario.area}`
                  }
                >
                  <Share2 size={17} />
                  Compartir conocimiento
                </button>
              </div>

              {!esMiArea && (
                <p className="hc-share-readonly-note">
                  <LockKeyhole size={14} />
                  Estás consultando {areaActiva}. Para compartir un
                  conocimiento, vuelve a tu área de Tecnología.
                </p>
              )}
            </section>

            {/* AVISO INFORMATIVO */}
            <footer className="hc-footer">
              <span>© Copyright SOPIA 2026</span>
              <span className="hc-footer-divider">·</span>
              <span>Plataforma de gestión del conocimiento</span>
              <span className="hc-footer-security">
                <ShieldCheck size={14} />
                Entorno corporativo
              </span>
            </footer>
          </div>
        </main>
      </div>

      {/* MENSAJE TEMPORAL EN PANTALLA */}
      {mensaje && (
        <div className="hc-toast" role="status" aria-live="polite">
          <span className="hc-toast-icon">
            <CheckCircle2 size={18} />
          </span>
          <span>{mensaje}</span>
          <button
            type="button"
            onClick={() => setMensaje("")}
            aria-label="Cerrar mensaje"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* MODAL PARA COMPARTIR CONOCIMIENTO */}
      {modalCompartirAbierto && (
        <div
          className="hc-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              cerrarModalCompartir();
            }
          }}
        >
          <section
            className="hc-share-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hc-modal-title"
          >
            <header className="hc-modal-header">
              <div className="hc-modal-heading">
                <div className="hc-modal-icon">
                  <Share2 size={23} />
                </div>
                <div>
                  <span className="hc-modal-eyebrow">
                    GESTIÓN DEL CONOCIMIENTO
                  </span>
                  <h2 id="hc-modal-title">Compartir conocimiento</h2>
                  <p>Tu experiencia puede ayudar a resolver otros desafíos.</p>
                </div>
              </div>

              <button
                type="button"
                className="hc-modal-close"
                onClick={cerrarModalCompartir}
                aria-label="Cerrar ventana"
              >
                <X size={21} />
              </button>
            </header>

            <form
              className="hc-modal-form"
              onSubmit={publicarConocimiento}
            >
              <div className="hc-modal-area-lock">
                <span className="hc-modal-area-icon">
                  <Building2 size={19} />
                </span>
                <div>
                  <span>ÁREA DE PUBLICACIÓN</span>
                  <strong>{usuario.area}</strong>
                </div>
                <span className="hc-modal-locked-badge">
                  <LockKeyhole size={13} />
                  Bloqueada
                </span>
              </div>

              <div className="hc-form-field">
                <label>¿Qué deseas compartir?</label>
                <div className="hc-knowledge-types">
                  {TIPOS_CONOCIMIENTO.map((tipo) => {
                    const IconoTipo = tipo.icono;
                    const seleccionado = tipoConocimiento === tipo.nombre;

                    return (
                      <button
                        type="button"
                        key={tipo.nombre}
                        className={[
                          "hc-knowledge-type",
                          seleccionado ? "hc-knowledge-type-active" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => setTipoConocimiento(tipo.nombre)}
                        aria-pressed={seleccionado}
                      >
                        <IconoTipo size={20} />
                        <strong>{tipo.nombre}</strong>
                        <span>{tipo.descripcion}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="hc-form-field">
                <label htmlFor="hc-knowledge-title">
                  Título del conocimiento
                </label>
                <input
                  id="hc-knowledge-title"
                  type="text"
                  value={tituloConocimiento}
                  onChange={(event) =>
                    setTituloConocimiento(event.target.value)
                  }
                  maxLength={120}
                  placeholder="Ej.: Cómo resolver una incidencia recurrente"
                  required
                />
                <small>
                  Utiliza un título concreto que facilite encontrar la
                  información.
                </small>
              </div>

              <div className="hc-form-field">
                <label htmlFor="hc-knowledge-detail">
                  Descripción del problema o conocimiento
                </label>
                <textarea
                  id="hc-knowledge-detail"
                  value={detalleConocimiento}
                  onChange={(event) =>
                    setDetalleConocimiento(event.target.value)
                  }
                  rows={4}
                  maxLength={4000}
                  placeholder="Explica el contexto, qué ocurrió y por qué es importante."
                  required
                />
                <small>{detalleConocimiento.length}/4000 caracteres</small>
              </div>

              <div className="hc-form-field">
                <label htmlFor="hc-knowledge-steps">
                  Pasos o solución aplicada
                  <span className="hc-optional-label">Opcional</span>
                </label>
                <textarea
                  id="hc-knowledge-steps"
                  value={pasosConocimiento}
                  onChange={(event) =>
                    setPasosConocimiento(event.target.value)
                  }
                  rows={3}
                  maxLength={4000}
                  placeholder="Detalla los pasos realizados, resultados y recomendaciones."
                />
              </div>

              <div className="hc-modal-info">
                <ShieldCheck size={17} />
                <p>
                  Este conocimiento se prepara para el área de {usuario.area}.
                  La autorización definitiva y el guardado deben validarse en
                  el servidor.
                </p>
              </div>

              {errorFormulario && (
                <div className="hc-form-error" role="alert">
                  <AlertCircle size={17} />
                  <span>{errorFormulario}</span>
                </div>
              )}

              <footer className="hc-modal-actions">
                <button
                  type="button"
                  className="hc-modal-cancel"
                  onClick={cerrarModalCompartir}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="hc-modal-submit"
                >
                  <FileText size={17} />
                  Validar conocimiento
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default Homeconocimiento;