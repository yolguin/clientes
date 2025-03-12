require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { conectarDB, sequelize } = require('./config/database');
const Seguimiento = require('./models/Seguimiento'); // Importar el modelo

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Importar rutas
const seguimientosRoutes = require('./routes/seguimientos.routes');
app.use('/api/seguimientos', seguimientosRoutes);

// Conectar a la base de datos y sincronizar modelos
const iniciarServidor = async () => {
    try {
        await conectarDB();
        await sequelize.sync({ alter: true });
        // Crea la tabla si no existe
        console.log('✅ Base de datos sincronizada');
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
    }
};

iniciarServidor();




