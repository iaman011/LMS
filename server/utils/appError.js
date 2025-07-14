class AppError extends Error {
    constructor (message, ststusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
