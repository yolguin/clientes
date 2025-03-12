const express = require('express');
const Seguimiento = require('../models/Seguimiento');

const router = express.Router();

// Obtener todos los seguimientos con alerta de plazos vencidos
router.get('/', async (req, res) => {
    try {
        const seguimientos = await Seguimiento.findAll();
        const hoy = new Date();

        const seguimientosConAlertas = seguimientos.map(seguimiento => ({
            ...seguimiento.toJSON(),
            vencido: new Date(seguimiento.fecha_limite) < hoy // ✅ Verifica si la fecha ya pasó
        }));

        res.json(seguimientosConAlertas);
    } catch (error) {
        console.error("❌ Error en actualización:", error);
        console.error("Detalles del error:", error.stack); // Agregar más detalles
        res.status(500).json({ error: error.message, details: error.stack });
    }
});

// Crear un nuevo seguimiento
router.post("/", async (req, res) => {
    try {
        const { cliente, correo, empresa, pais, estado, comentario, fecha_limite, responsable, semaforo, tresa } = req.body;

        const nuevoSeguimiento = await Seguimiento.create({
            cliente,
            correo,
            empresa,
            pais,
            estado,
            comentario,
            fecha_limite,
            responsable,
            semaforo,
            tresa: tresa || "No aplica" // ✅ Valor por defecto para "Tresa"
        });

        res.status(201).json(nuevoSeguimiento);
    } catch (error) {
        console.error("❌ Error al crear el seguimiento:", error);
        res.status(500).json({ error: "Error al crear el seguimiento" });
    }
});

// Obtener un seguimiento por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const seguimiento = await Seguimiento.findByPk(id);

        if (!seguimiento) {
            return res.status(404).json({ error: 'Seguimiento no encontrado' });
        }

        res.json(seguimiento);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el seguimiento' });
    }
});

// Actualizar un seguimiento por ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { cliente, correo, empresa, pais, estado, comentario, fecha_limite, responsable, semaforo, tresa } = req.body;

        const seguimiento = await Seguimiento.findByPk(id);
        if (!seguimiento) {
            return res.status(404).json({ error: 'Seguimiento no encontrado' });
        }

        await seguimiento.update({
            cliente,
            correo,
            empresa,
            pais,
            estado,
            comentario,
            fecha_limite,
            responsable,
            semaforo,
            tresa
        });

        res.json({ message: 'Seguimiento actualizado correctamente', seguimiento });
    } catch (error) {
        console.error("❌ Error en actualización:", error);
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un seguimiento por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const seguimiento = await Seguimiento.findByPk(id);

        if (!seguimiento) {
            return res.status(404).json({ error: 'Seguimiento no encontrado' });
        }

        await seguimiento.destroy();
        res.json({ message: 'Seguimiento eliminado correctamente' });
    } catch (error) {
        console.error("❌ Error al eliminar el seguimiento:", error);
        res.status(500).json({ error: "Error al eliminar el seguimiento" });
    }
});

module.exports = router;


