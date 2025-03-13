const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432, // Agregar puerto
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Evita errores de certificado en Render
        },
    },
});

const conectarDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
    }
};

module.exports = { sequelize, conectarDB };

