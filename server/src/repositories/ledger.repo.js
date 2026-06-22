const Ledger = require("../models/ledger.model");


// ===============================
// 1. Create Ledger Entry
// ===============================
const createLedgerEntry = async (data) => {

    const ledger = new Ledger({
        transactionId: data.transactionId,
        userId: data.userId,
        walletId: data.walletId,
        bankAccountId: data.bankAccountId,
        balanceAfterTransactionEncrypted: data.balanceAfterTransactionEncrypted,
        type: data.type,
        amountEncrypted: data.amountEncrypted
    });

    return await ledger.save();
};


// ===============================
// 2. Get Ledger by User
// ===============================
const getLedgerByUserId = async (userId) => {

    return await Ledger.find({
        userId
    }).sort({ createdAt: -1 });
};


// ===============================
// 3. Get Ledger by Wallet
// ===============================
const getLedgerByWalletId = async (walletId) => {

    return await Ledger.find({
        walletId
    }).sort({ createdAt: -1 });
};


// ===============================
// 4. Get Ledger by Transaction
// ===============================
const getLedgerByTransactionId = async (transactionId) => {

    return await Ledger.findOne({
        transactionId
    });
};


// ===============================
// 5. Get Single Ledger Entry
// ===============================
const getLedgerById = async (ledgerId) => {

    return await Ledger.findById(ledgerId);
};


// ===============================
// 6. Get Debit/Credit History
// ===============================
const getLedgerByType = async (userId, type) => {

    return await Ledger.find({
        userId,
        type
    }).sort({ createdAt: -1 });
};


// ===============================
// 7. Delete Ledger (Rarely used)
// ===============================
const deleteLedgerById = async (ledgerId) => {

    return await Ledger.findByIdAndDelete(ledgerId);
};


// ===============================
// 8. Bulk Ledger Insert (for batch ops)
// ===============================
const createManyLedgerEntries = async (entries) => {

    return await Ledger.insertMany(entries);
};


// ===============================
// Export
// ===============================
module.exports = {
    createLedgerEntry,
    getLedgerByUserId,
    getLedgerByWalletId,
    getLedgerByTransactionId,
    getLedgerById,
    getLedgerByType,
    deleteLedgerById,
    createManyLedgerEntries
};