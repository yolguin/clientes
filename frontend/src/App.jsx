import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SeguimientosList from "./pages/SeguimientosList";
import NuevoSeguimiento from "./pages/NuevoSeguimiento";
import EditarSeguimiento from "./pages/EditarSeguimiento";

function App() {
  const [seguimientos, setSeguimientos] = useState([]);

  const fetchSeguimientos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/seguimientos");
      const data = await response.json();
      setSeguimientos(data); // ✅ Forzar actualización de la lista
    } catch (error) {
      console.error("Error al obtener los seguimientos:", error);
    }
  };

  useEffect(() => {
    fetchSeguimientos();
  }, []);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">Seguimientos</Link>
          <Link to="/nuevo" className="btn btn-success">+ Nuevo Seguimiento</Link>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<SeguimientosList seguimientos={seguimientos} actualizarLista={fetchSeguimientos} />} />
          <Route path="/nuevo" element={<NuevoSeguimiento actualizarLista={fetchSeguimientos} />} />
          <Route path="/editar/:id" element={<EditarSeguimiento actualizarLista={fetchSeguimientos} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




