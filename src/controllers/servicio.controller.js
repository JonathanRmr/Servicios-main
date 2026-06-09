const Servicio = require('../models/servicio.model');

/**
 * Controlador de Servicios.
 * Cada función responde con un objeto consistente: { ok, data | mensaje, ... }
 */

// CREATE - Crear un nuevo servicio
const crearServicio = async (req, res) => {
  try {
    const servicio = await Servicio.create(req.body);
    return res.status(201).json({ ok: true, data: servicio });
  } catch (error) {
    return res
      .status(400)
      .json({ ok: false, mensaje: 'No se pudo crear el servicio', error: error.message });
  }
};

// READ - Listar servicios con filtros y paginación opcionales
const obtenerServicios = async (req, res) => {
  try {
    const { categoria, activo, page = 1, limit = 10 } = req.query;

    const filtro = {};
    if (categoria) filtro.categoria = categoria;
    if (activo !== undefined) filtro.activo = activo === 'true';

    const skip = (Number(page) - 1) * Number(limit);

    const [servicios, total] = await Promise.all([
      Servicio.find(filtro).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Servicio.countDocuments(filtro),
    ]);

    return res.json({
      ok: true,
      data: servicios,
      paginacion: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPaginas: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error al obtener servicios', error: error.message });
  }
};

// READ - Obtener un servicio por ID
const obtenerServicioPorId = async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) {
      return res.status(404).json({ ok: false, mensaje: 'Servicio no encontrado' });
    }
    return res.json({ ok: true, data: servicio });
  } catch (error) {
    return res.status(400).json({ ok: false, mensaje: 'ID inválido', error: error.message });
  }
};

// UPDATE - Actualizar un servicio
const actualizarServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // devuelve el documento ya actualizado
      runValidators: true, // aplica las validaciones del schema
    });
    if (!servicio) {
      return res.status(404).json({ ok: false, mensaje: 'Servicio no encontrado' });
    }
    return res.json({ ok: true, data: servicio });
  } catch (error) {
    return res
      .status(400)
      .json({ ok: false, mensaje: 'No se pudo actualizar el servicio', error: error.message });
  }
};

// DELETE - Eliminar un servicio
const eliminarServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndDelete(req.params.id);
    if (!servicio) {
      return res.status(404).json({ ok: false, mensaje: 'Servicio no encontrado' });
    }
    return res.json({ ok: true, mensaje: 'Servicio eliminado correctamente' });
  } catch (error) {
    return res
      .status(400)
      .json({ ok: false, mensaje: 'No se pudo eliminar el servicio', error: error.message });
  }
};

module.exports = {
  crearServicio,
  obtenerServicios,
  obtenerServicioPorId,
  actualizarServicio,
  eliminarServicio,
};