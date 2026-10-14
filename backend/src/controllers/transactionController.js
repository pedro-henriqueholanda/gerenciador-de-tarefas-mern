const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

const createTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.create({
            ...req.body,
            user: req.userId
        });

        res.status(201).json(transaction);
    } catch (error) {
        next(error);
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

const updateTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            {
                type: req.body.type,
                value: req.body.value,
                category: req.body.category,
                description: req.body.description,
                date: req.body.date
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!transaction) {
            return res.status(404).json({
                message: "Transação não encontrada"
            });
        }

        res.json(transaction);
    } catch (error) {
        next(error);
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