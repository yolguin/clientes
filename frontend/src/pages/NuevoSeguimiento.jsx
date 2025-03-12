import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NuevoSeguimiento() {
  const [form, setForm] = useState({
    cliente: "Desconocido",
    correo: "",
    empresa: "",
    pais: "",
    estado: "pendiente",
    comentario: "",
    fecha_limite: "",
    responsable: "Nadie",
    semaforo: "poco atractivo",
    tresa: "No aplica",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/seguimientos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Seguimiento agregado correctamente");
        navigate("/");
      } else {
        alert("Error al agregar el seguimiento");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Nuevo Seguimiento</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {/* CLIENTE */}
        <div className="mb-3">
          <label className="form-label">Cliente:</label>
          <input type="text" className="form-control" name="cliente" value={form.cliente} onChange={handleChange} required />
        </div>

        {/* CORREO */}
        <div className="mb-3">
          <label className="form-label">Correo:</label>
          <input type="email" className="form-control" name="correo" value={form.correo} onChange={handleChange} required />
        </div>

        {/* EMPRESA */}
        <div className="mb-3">
          <label className="form-label">Empresa:</label>
          <input type="text" className="form-control" name="empresa" value={form.empresa} onChange={handleChange} required />
        </div>

        {/* PAÍS */}
        <div className="mb-3">
          <label className="form-label">País:</label>
          <input type="text" className="form-control" name="pais" value={form.pais} onChange={handleChange} required />
        </div>

        {/* ESTADO */}
        <div className="mb-3">
          <label className="form-label">Estado:</label>
          <select name="estado" className="form-select" value={form.estado} onChange={handleChange}>
            <option value="pendiente">Pendiente</option>
            <option value="en proceso">En Proceso</option>
            <option value="completado">Completado</option>
          </select>
        </div>

        {/* RESPONSABLE */}
        <div className="mb-3">
          <label className="form-label">Responsable:</label>
          <select name="responsable" className="form-select" value={form.responsable} onChange={handleChange}>
            <option value="Nadie">Nadie</option>
            <option value="Yenny">Yenny</option>
            <option value="Alejandra">Alejandra</option>
            <option value="Osvaldo">Osvaldo</option>
          </select>
        </div>

        {/* SEMÁFORO */}
        <div className="mb-3">
          <label className="form-label">Semáforo:</label>
          <select name="semaforo" className="form-select" value={form.semaforo} onChange={handleChange}>
            <option value="atractivo">🟠 Atractivo</option>
            <option value="medianamente atractivo">🟡 Medianamente Atractivo</option>
            <option value="poco atractivo">🟢 Poco Atractivo</option>
          </select>
        </div>

        {/* TRESA */}
        <div className="mb-3">
          <label className="form-label">Tresa:</label>
          <select name="tresa" className="form-select" value={form.tresa} onChange={handleChange}>
            <option value="No aplica">No aplica</option>
            <option value="Requiere información adicional">Requiere información adicional</option>
            <option value="Información al día">Información al día</option>
          </select>
        </div>

        {/* COMENTARIO */}
        <div className="mb-3">
          <label className="form-label">Comentario:</label>
          <textarea className="form-control" name="comentario" value={form.comentario} onChange={handleChange}></textarea>
        </div>

        {/* FECHA LÍMITE */}
        <div className="mb-3">
          <label className="form-label">Fecha Límite:</label>
          <input type="date" className="form-control" name="fecha_limite" value={form.fecha_limite} onChange={handleChange} required />
        </div>

        {/* BOTÓN SUBMIT */}
        <button type="submit" className="btn btn-success w-100">Agregar Seguimiento</button>
      </form>
    </div>
  );
}

export default NuevoSeguimiento;



