const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API funcionando!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

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