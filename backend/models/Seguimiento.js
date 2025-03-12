const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Seguimiento = sequelize.define("Seguimiento", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cliente: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Desconocido",
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM("pendiente", "en proceso", "completado"),
    allowNull: false,
    defaultValue: "pendiente",
  },
  comentario: {
    type: DataTypes.TEXT,
  },
  fecha_limite: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  responsable: {
    type: DataTypes.ENUM("Nadie", "Yenny", "Alejandra", "Osvaldo"),
    allowNull: false,
    defaultValue: "Nadie",
  },
  semaforo: {
    type: DataTypes.ENUM("atractivo", "medianamente atractivo", "poco atractivo"),
    allowNull: false,
    defaultValue: "poco atractivo",
  },
  tresa: {
    type: DataTypes.STRING, // Cambio de ENUM a STRING para evitar conflictos con PostgreSQL
    allowNull: false,
    defaultValue: "No aplica",
  },
}, {
  timestamps: false,
});

module.exports = Seguimiento;



