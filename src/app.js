const express = require('express');
const cors = require('cors');
 
const servicioRoutes = require('./routes/servicio.routes');
const productoRoutes = require('./routes/producto.routes');
 
const app = express();
 
// Middlewares globales
app.use(cors());
app.use(express.json());
 
// Ruta de salud (health check) - útil para el API gateway / monitoreo
app.get('/api/salud', (req, res) => {
  res.json({ ok: true, servicio: 'modulo-servicios', estado: 'activo' });
});
 
// Rutas del módulo
app.use('/api/servicios', servicioRoutes);
app.use('/api/productos', productoRoutes);
 
// Ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' });
});
 
module.exports = app;
 