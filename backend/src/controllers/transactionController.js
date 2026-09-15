const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create({
            ...req.body,
            user: req.userId
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar transação" });
    }
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.userId })
            .sort({ date: -1 });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar transações" });
    }
};

const getTransaction = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!transaction) {
            return res.status(404).json({ message: "Transação não encontrada" });
        }

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar transação" });
    }
};

const updateTransaction = async (req, res) => {
    try {
        console.log("ID recebido:", req.params.id);
        console.log("Usuário autenticado:", req.userId);

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.userId
        });

        console.log("Transação encontrada:", transaction);

        if (!transaction) {
            return res.status(404).json({
                message: "Transação não encontrada"
            });
        }

        transaction.type = req.body.type;
        transaction.value = req.body.value;
        transaction.category = req.body.category;
        transaction.description = req.body.description;
        transaction.date = req.body.date;

        await transaction.save();

        res.json(transaction);
    } catch (error) {
        console.error("ERRO NO PUT:", error);
        res.status(400).json({
            message: "Erro ao atualizar transação"
        });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!transaction) {
            return res.status(404).json({ message: "Transação não encontrada" });
        }

        res.json({ message: "Transação excluída com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao excluir transação" });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
};