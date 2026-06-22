const Transaction = require("../models/transaction.model");


// ===============================
// 1. Create Transaction
// ===============================
const createTransaction = async (data) => {

    const transaction = new Transaction({
        senderId: data.senderId,
        receiverId: data.receiverId,

        senderAccountId: data.senderAccountId,
        receiverAccountId: data.receiverAccountId,

        senderWalletId: data.senderWalletId,
        receiverWalletId: data.receiverWalletId,

        amountEncrypted: data.amountEncrypted,

        transactionType: data.transactionType,

        status: data.status || "PENDING",

        referenceId: data.referenceId,

        description: data.description
    });

    return await transaction.save();
};


// ===============================
// 2. Get Transaction by ID
// ===============================
const getTransactionById = async (transactionId) => {

    return await Transaction.findById(transactionId)
        .populate("senderId receiverId")
        .populate("senderWalletId receiverWalletId")
        .populate("senderAccountId receiverAccountId");
};


// ===============================
// 3. Get Transaction by Reference ID
// ===============================
const getTransactionByReferenceId = async (referenceId) => {

    return await Transaction.findOne({
        referenceId
    });
};


// ===============================
// 4. Get All Transactions for User
// ===============================
const getTransactionsByUserId = async (userId) => {

    return await Transaction.find({
        $or: [
            { senderId: userId },
            { receiverId: userId }
        ]
    }).sort({ createdAt: -1 });
};


// ===============================
// 5. Get Transactions by Wallet
// ===============================
const getTransactionsByWalletId = async (walletId) => {

    return await Transaction.find({
        $or: [
            { senderWalletId: walletId },
            { receiverWalletId: walletId }
        ]
    }).sort({ createdAt: -1 });
};


// ===============================
// 6. Get Transactions by Type
// ===============================
const getTransactionsByType = async (type) => {

    return await Transaction.find({
        transactionType: type
    }).sort({ createdAt: -1 });
};


// ===============================
// 7. Update Transaction Status
// ===============================
const updateTransactionStatus = async (transactionId, status) => {

    return await Transaction.findByIdAndUpdate(
        transactionId,
        { status },
        { new: true }
    );
};


// ===============================
// 8. Delete Transaction (rare use case)
// ===============================
const deleteTransaction = async (transactionId) => {

    return await Transaction.findByIdAndDelete(transactionId);
};


// ===============================
// 9. List all transactions (admin)
// ===============================
const getAllTransactions = async (limit = 50, skip = 0) => {

    return await Transaction.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
};


// ===============================
// Export
// ===============================
module.exports = {
    createTransaction,
    getTransactionById,
    getTransactionByReferenceId,
    getTransactionsByUserId,
    getTransactionsByWalletId,
    getTransactionsByType,
    updateTransactionStatus,
    deleteTransaction,
    getAllTransactions
};