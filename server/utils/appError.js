class AppError extends Error {
    constructor (message, ststusCode) {
        super(message);
        this.statusCode = ststusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;