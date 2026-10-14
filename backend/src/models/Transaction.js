const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["entrada", "saida"],
        required: true
    },
    value: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        validate: {
                validator: function (value) {
                    return parseFloat(value.toString()) > 0;
                },
                message: "O valor deve ser maior que zero"
            }
        },
    category: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        maxlength: 100
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
    }
);

module.exports = mongoose.model("Transaction", transactionSchema);