class AppError extends Error {
    constructor(message, statusCode) {
        super(message); //llama al constructor de error con el mensaje
        this.statusCode = statusCode;
        this.isOperational = true; //errores lanzaodos a proposito
    }
}

module.exports = AppError;