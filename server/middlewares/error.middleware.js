const errorMiddleware = (err, req, res, next) => {
    req.statusCode = req.statusCode || 500;
    req.message = req.message || "something went wrong";

    return res.status(req.statusCode).json({
        success: false,
        message: req.message,
        stack: err.stack
    });
}

export default errorMiddleware;

