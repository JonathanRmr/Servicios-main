const mongoose = require('mongoose');

/**
 * Modelo de Servicio (ej. corte clásico, arreglo de barba, tinte...).
 */
const servicioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del servicio es obligatorio'],
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
      default: '',
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    duracionMinutos: {
      type: Number,
      required: [true, 'La duración es obligatoria'],
      min: [1, 'La duración debe ser de al menos 1 minuto'],
    },
    categoria: {
      type: String,
      trim: true,
      default: 'general',
    },
    imagen: {
      type: String,
      trim: true,
      default: '',
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // agrega createdAt y updatedAt
);

module.exports = mongoose.model('Servicio', servicioSchema);