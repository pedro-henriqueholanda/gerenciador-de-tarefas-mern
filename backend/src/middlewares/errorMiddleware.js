const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(
            (error) => error.message
        );

        return res.status(400).json({
            message: "Erro de validação",
            errors
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Formato de dado inválido"
        });
    }

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message: err.message || "Erro interno do servidor"
    });
};

module.exports = errorMiddleware;