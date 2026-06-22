import mongoose from "mongoose";


const ledgerSchema = new mongoose.Schema({

    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    },


    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },


    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
        // Make optional, as it might be a bank transaction
    },
    bankAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BankAccount",
        // Make optional, as it might be a wallet transaction
    },
    balanceAfterTransactionEncrypted: {
        type: String,
        required: true
    },

type: {
        type: String,
        enum: [
            "CREDIT",
            "DEBIT"
        ]
    },


    amountEncrypted: {
        type: String
    }


},
    {
        timestamps: true
    });


export default mongoose.model(
    "Ledger",
    ledgerSchema
);