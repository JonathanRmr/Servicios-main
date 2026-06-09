const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación.
 *
 * En una arquitectura shared-nothing este servicio NO consulta la base de
 * usuarios. Solo verifica el JWT que emitió el servicio de usuarios usando
 * el secreto COMPARTIDO (process.env.JWT_SECRET). Si el token es válido,
 * adjunta el payload decodificado en req.usuario.
 */
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ ok: false, mensaje: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // ej. { id, email, tipoUsuario, ... }
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, mensaje: 'Token inválido o expirado' });
  }
};

/**
 * Middleware opcional para restringir por rol.
 * Úsalo después de verificarToken, ej: router.post('/', verificarToken, soloAdmin, crear...)
 */
const soloAdmin = (req, res, next) => {
  if (req.usuario?.tipoUsuario !== 'admin') {
    return res.status(403).json({ ok: false, mensaje: 'Acceso restringido a administradores' });
  }
  next();
};

module.exports = { verificarToken, soloAdmin };