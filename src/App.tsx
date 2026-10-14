import { Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import Ingresorecuoperaenvio from "./pages/Ingresorecuoperaenvio";
import Ingresorecuoperapass from "./pages/Ingresorecuoperapass";
import Registroempresa from "./pages/Registrompresa";
import Homeconocimiento from "./pages/Homeconocimiento";

function App() {
  return (
    <Routes>
      {/* Página inicial: Login */}
      <Route path="/" element={<Index />} />

      {/* Recuperación de contraseña */}
      <Route
        path="/Ingresorecuoperaenvio"
        element={<Ingresorecuoperaenvio />}
      />

      <Route
        path="/Ingresorecuoperapass"
        element={<Ingresorecuoperapass />}
      />

      {/* Registro de empresa */}
      <Route
        path="/registroempresa"
        element={<Registroempresa />}
      />

      {/* Página principal de la empresa */}
      <Route
        path="/Homeconocimiento"
        element={<Homeconocimiento />}
      />

      {/* Compatibilidad con la ruta anterior */}
      <Route
        path="/dashboard"
        element={<Homeconocimiento />}
      />

      {/* Direcciones no reconocidas */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;