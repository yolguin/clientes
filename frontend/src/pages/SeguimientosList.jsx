import { Link } from "react-router-dom";

const API_URL = "https://seguimientos.onrender.com/api/seguimientos"; // 🔹 Nueva URL del backend

function SeguimientosList({ seguimientos, actualizarLista }) {
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este seguimiento?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Seguimiento eliminado correctamente");
          actualizarLista();
        } else {
          alert("Error al eliminar el seguimiento");
        }
      } catch (error) {
        console.error("Error al eliminar seguimiento:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Seguimientos</h1>
      {seguimientos.length === 0 ? (
        <p className="text-center text-muted">No hay seguimientos registrados.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Cliente</th>
              <th>Empresa</th>
              <th>País</th>
              <th>Correo</th>
              <th>Comentario</th>
              <th>Responsable</th>
              <th>Semáforo</th>
              <th>Estado</th>
              <th>Tresa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {seguimientos.map((seguimiento) => (
              <tr key={seguimiento.id} className={seguimiento.vencido ? "table-danger" : ""}>
                <td><strong>{seguimiento.cliente}</strong></td>
                <td>{seguimiento.empresa}</td>
                <td>{seguimiento.pais}</td>
                <td>{seguimiento.correo}</td>
                <td>{seguimiento.comentario || "Sin comentario"}</td>
                <td>{seguimiento.responsable}</td>
                <td>
                  <span className={`badge text-white 
                    ${seguimiento.semaforo === "atractivo" ? "bg-danger" :
                      seguimiento.semaforo === "medianamente atractivo" ? "bg-warning text-dark" :
                      "bg-primary"}`}>  
                    {seguimiento.semaforo}
                  </span>
                </td>
                <td>
                  <span className={`badge 
                    ${seguimiento.estado === "pendiente" ? "bg-warning" :
                      seguimiento.estado === "en proceso" ? "bg-primary" :
                      "bg-success"}`}>
                    {seguimiento.estado}
                  </span>
                </td>
                <td>{seguimiento.tresa}</td>
                <td>
                  <Link to={`/editar/${seguimiento.id}`} className="btn btn-primary btn-sm me-2">
                    ✏️ Editar
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(seguimiento.id)}>
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SeguimientosList;












