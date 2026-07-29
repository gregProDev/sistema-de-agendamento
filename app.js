const AppError = require("./src/Error/AppError");
const ErrorMiddleware = require("./src/middlewares/ErrorMiddleware");
require("dotenv").config();

const express = require("express")

const connectDatabase = require("./src/config/Database");

const app = express()

app.use(express.json())

connectDatabase()

const clienteRoutes  = require("./src/routes/ClienteRoutes")

app.use("/clientes", clienteRoutes)

app.use((err, req, res, next) => {

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
});

module.exports = app;