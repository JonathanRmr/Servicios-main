const express = require('express');
const router = express.Router();

const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/producto.controller');

const { verificarToken } = require('../middlewares/auth.middleware');

// Rutas públicas (lectura)
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);

// Rutas protegidas (escritura)
router.post('/', verificarToken, crearProducto);
router.put('/:id', verificarToken, actualizarProducto);
router.delete('/:id', verificarToken, eliminarProducto);

module.exports = router;