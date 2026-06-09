const Producto = require('../models/producto.model');

/**
 * Controlador de Productos.
 */

// CREATE
const crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    return res.status(201).json({ ok: true, data: producto });
  } catch (error) {
    return res
      .status(400)
      .json({ ok: false, mensaje: 'No se pudo crear el producto', error: error.message });
  }
};

// READ - Listar con filtros y paginación
const obtenerProductos = async (req, res) => {
  try {
    const { categoria, marca, activo, page = 1, limit = 10 } = req.query;

    const filtro = {};
    if (categoria) filtro.categoria = categoria;
    if (marca) filtro.marca = marca;
    if (activo !== undefined) filtro.activo = activo === 'true';

    const skip = (Number(page) - 1) * Number(limit);

    const [productos, total] = await Promise.all([
      Producto.find(filtro).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Producto.countDocuments(filtro),
    ]);

    return res.json({
      ok: true,
      data: productos,
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
      .json({ ok: false, mensaje: 'Error al obtener productos', error: error.message });
  }
};

// READ - Por ID
const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    }
    return res.json({ ok: true, data: producto });
  } catch (error) {
    return res.status(400).json({ ok: false, mensaje: 'ID inválido', error: error.message });
  }
};

// UPDATE
const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!producto) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    }
    return res.json({ ok: true, data: producto });
  } catch (error) {
    return res
      .status(400)
      .json({ ok: false, mensaje: 'No se pudo actualizar el producto', error: error.message });
  }
};

// DELETE
const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    }
    return res.json({ ok: true, mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    return res
      .status(400)
      .json({ ok: false, mensaje: 'No se pudo eliminar el producto', error: error.message });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
};