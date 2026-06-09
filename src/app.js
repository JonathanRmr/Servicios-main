const express = require('express');
const cors = require('cors');

const servicioRoutes = require('./routes/servicio.routes');
const productoRoutes = require('./routes/producto.routes');

const app = express();

// CORS con variable de entorno (igual que módulo Usuarios)
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : '*';

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Health check en /health — Render lo requiere en esta ruta exacta
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'Servicios API',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
});

// Mantener /api/salud por compatibilidad con otros módulos que lo usen
app.get('/api/salud', (req, res) => {
    res.json({ ok: true, servicio: 'modulo-servicios', estado: 'activo' });
});

// Rutas del módulo
app.use('/api/servicios', servicioRoutes);
app.use('/api/productos', productoRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' });
});

module.exports = app;