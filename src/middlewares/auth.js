// src/middlewares/auth.js
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
  try {
    // 1. Verificar que viene el token en el header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No autorizado. Token requerido', 401);
    }

    // 2. Extraer el token (viene como "Bearer eyJhbGci...")
    const token = authHeader.split(' ')[1];

    // 3. Verificar que el token es válido y no expiró
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Buscar el usuario en la DB
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new AppError('El usuario ya no existe', 401);
    }

    // 5. Adjuntar el usuario al request para usarlo después
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Token inválido', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expirado. Inicia sesión de nuevo', 401));
    }
    next(error);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `El rol '${req.user.role}' no tiene permiso para realizar esta acción`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { protect, authorize };