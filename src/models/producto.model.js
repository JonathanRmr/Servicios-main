const mongoose = require('mongoose');

/**
 * Modelo de Producto (ej. cera, shampoo, aceite para barba...).
 */
const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
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
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
    marca: {
      type: String,
      trim: true,
      default: '',
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
  { timestamps: true }
);

module.exports = mongoose.model('Producto', productoSchema);