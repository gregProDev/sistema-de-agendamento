const AppError = require("../Error/AppError");

function errorMiddleware(err, req, res, next) {

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    console.error(err);

    return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
    });
}

module.exports = errorMiddleware;