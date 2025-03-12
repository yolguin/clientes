import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditarSeguimiento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cliente: "",
    correo: "",
    empresa: "",
    pais: "",
    estado: "pendiente",
    comentario: "",
    fecha_limite: "",
    responsable: "Nadie",
    semaforo: "poco atractivo",
    tresa: "No aplica", // ✅ Agregado "Tresa"
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/seguimientos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.fecha_limite) {
          data.fecha_limite = data.fecha_limite.split("T")[0];
        }
        setForm(data);
      })
      .catch((error) => console.error("Error al obtener el seguimiento:", error));
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/seguimientos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Seguimiento actualizado correctamente");
        navigate("/");
      } else {
        alert("Error al actualizar el seguimiento");
      }
    } catch (error) {
      console.error("Error al actualizar el seguimiento:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Editar Seguimiento</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="row">
          {/* Primera columna */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Cliente:</label>
              <input type="text" className="form-control" name="cliente" value={form.cliente} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo:</label>
              <input type="email" className="form-control" name="correo" value={form.correo} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Empresa:</label>
              <input type="text" className="form-control" name="empresa" value={form.empresa} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">País:</label>
              <input type="text" className="form-control" name="pais" value={form.pais} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Estado:</label>
              <select name="estado" className="form-select" value={form.estado} onChange={handleChange}>
                <option value="pendiente">Pendiente</option>
                <option value="en proceso">En Proceso</option>
                <option value="completado">Completado</option>
              </select>
            </div>
          </div>

          {/* Segunda columna */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Responsable:</label>
              <select name="responsable" className="form-select" value={form.responsable} onChange={handleChange}>
                <option value="Nadie">Nadie</option>
                <option value="Yenny">Yenny</option>
                <option value="Alejandra">Alejandra</option>
                <option value="Osvaldo">Osvaldo</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Semáforo:</label>
              <select name="semaforo" className="form-select" value={form.semaforo} onChange={handleChange}>
                <option value="atractivo">🟥 Atractivo</option>
                <option value="medianamente atractivo">🟣 Medianamente Atractivo</option>
                <option value="poco atractivo">🟢 Poco Atractivo</option>
              </select>
            </div>

            {/* ✅ Agregado "Tresa" en el formulario */}
            <div className="mb-3">
              <label className="form-label">Tresa:</label>
              <select name="tresa" className="form-select" value={form.tresa} onChange={handleChange}>
                <option value="No aplica">No aplica</option>
                <option value="Requiere información adicional">Requiere información adicional</option>
                <option value="Información al día">Información al día</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Comentario:</label>
              <textarea className="form-control" name="comentario" value={form.comentario} onChange={handleChange}></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha Límite:</label>
              <input type="date" className="form-control" name="fecha_limite" value={form.fecha_limite} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Actualizar Seguimiento</button>
      </form>
    </div>
  );
}

export default EditarSeguimiento;







