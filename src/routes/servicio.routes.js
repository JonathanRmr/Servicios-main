const express = require('express');
const router = express.Router();

const {
  crearServicio,
  obtenerServicios,
  obtenerServicioPorId,
  actualizarServicio,
  eliminarServicio,
} = require('../controllers/servicio.controller');

const { verificarToken } = require('../middlewares/auth.middleware');

// Rutas públicas (lectura) - cualquiera puede ver el catálogo
router.get('/', obtenerServicios);
router.get('/:id', obtenerServicioPorId);

// Rutas protegidas (escritura) - requieren JWT válido
router.post('/', verificarToken, crearServicio);
router.put('/:id', verificarToken, actualizarServicio);
router.delete('/:id', verificarToken, eliminarServicio);

module.exports = router;