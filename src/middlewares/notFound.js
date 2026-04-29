const AppError = require('../utils/AppError');

const notFound = (req, res, next) => {
    const error = new AppError(
        `Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404
    );
    next(error); //le pasa el error al errorHandler
};

module.exports = notFound;