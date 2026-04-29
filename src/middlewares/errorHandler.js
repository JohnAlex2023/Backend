// src/middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Si el error no tiene statusCode, es un error inesperado del servidor
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Error interno del servidor';

  // Error de ID inválido de MongoDB (ej: ID mal formado)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `ID inválido: ${err.value}`;
  }

  // Error de campo único duplicado (ej: email ya existe)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `El ${field} ya está registrado`;
  }

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Solo en desarrollo mostramos el stack trace
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;