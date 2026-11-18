const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API funcionando!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Rota protegida de demonstracao da autenticacao JWT
app.get("/api/dashboard", authMiddleware, (req, res) => {
    res.json({
        message: "Acesso autorizado ao dashboard",
        userId: req.userId
    });
});

// Middleware global de tratamento de erros
app.use(errorMiddleware);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB conectado!");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao conectar no MongoDB:", error);
    });