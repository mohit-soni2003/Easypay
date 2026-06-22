const walletRepo = require("../repositories/wallet.repo");
const transactionRepo = require("../repositories/transaction.repo");
const ledgerRepo = require("../repositories/ledger.repo");



// ===============================
// 1. Create Wallet
// ===============================
const createWallet = async (userId, walletNumber) => {

    const existing = await walletRepo.walletExists(userId);

    if (existing) {
        throw new Error("Wallet already exists for this user");
    }

    return await walletRepo.createWallet(userId, walletNumber);
};


// ===============================
// 2. Get User Wallet
// ===============================
const getUserWallet = async (userId) => {

    const wallet = await walletRepo.getActiveWalletByUserId(userId);

    if (!wallet) {
        throw new Error("Wallet not found or inactive");
    }

    return wallet;
};


// ===============================
// 3. Get Wallet by Wallet Number
// ===============================
const getWalletByNumber = async (walletNumber) => {

    const wallet = await walletRepo.getWalletByWalletNumber(walletNumber);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    if (wallet.status !== "ACTIVE") {
        throw new Error("Wallet is not active");
    }

    return wallet;
};


// ===============================
// 4. Credit Wallet
// ===============================
const creditWallet = async (walletId, amount) => {

    if (amount <= 0) {
        throw new Error("Invalid credit amount");
    }

    const wallet = await walletRepo.getWalletById(walletId);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    if (wallet.status !== "ACTIVE") {
        throw new Error("Wallet is not active");
    }

    const updated = await walletRepo.increaseWalletBalance(walletId, amount);

    return updated;
};


// ===============================
// 5. Debit Wallet
// ===============================
const debitWallet = async (walletId, amount) => {

    if (amount <= 0) {
        throw new Error("Invalid debit amount");
    }

    const wallet = await walletRepo.getWalletById(walletId);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    if (wallet.status !== "ACTIVE") {
        throw new Error("Wallet is not active");
    }

    if (wallet.balance < amount) {
        throw new Error("Insufficient balance");
    }

    const updated = await walletRepo.decreaseWalletBalance(walletId, amount);

    return updated;
};


// ===============================
// 6. Transfer Money (P2P)
// ===============================
const { v4: uuidv4 } = require("uuid");

const transferMoney = async (fromWalletId, toWalletNumber, amount) => {

    if (amount <= 0) {
        throw new Error("Invalid transfer amount");
    }

    // ===============================
    // 1. Get sender wallet
    // ===============================
    const senderWallet = await walletRepo.getWalletById(fromWalletId);

    if (!senderWallet) {
        throw new Error("Sender wallet not found");
    }

    if (senderWallet.status !== "ACTIVE") {
        throw new Error("Sender wallet is not active");
    }

    // ===============================
    // 2. Get receiver wallet
    // ===============================
    const receiver = await walletRepo.getWalletByWalletNumber(toWalletNumber);

    if (!receiver) {
        throw new Error("Receiver wallet not found");
    }

    if (receiver.status !== "ACTIVE") {
        throw new Error("Receiver wallet is not active");
    }

    // ===============================
    // 3. Balance check
    // ===============================
    if (senderWallet.balance < amount) {
        throw new Error("Insufficient balance");
    }

    // ===============================
    // 4. Create Transaction (PENDING)
    // ===============================
    const transaction = await transactionRepo.createTransaction({
        senderId: senderWallet.userId,
        receiverId: receiver.userId,

        senderWalletId: senderWallet._id,
        receiverWalletId: receiver._id,

        amountEncrypted: String(amount),
        transactionType: "WALLET_TO_WALLET",
        status: "PENDING",
        referenceId: uuidv4(),
        description: `Transfer from ${senderWallet.walletNumber} to ${receiver.walletNumber}`
    });

    try {

        // ===============================
        // 5. Debit sender wallet
        // ===============================
        const updatedSender = await walletRepo.decreaseWalletBalance(
            fromWalletId,
            amount
        );

        // ===============================
        // 6. Credit receiver wallet
        // ===============================
        const updatedReceiver = await walletRepo.increaseWalletBalance(
            receiver._id,
            amount
        );

        // ===============================
        // 7. Create Ledger Entries
        // ===============================

        // Sender ledger (DEBIT)
        await ledgerRepo.createLedgerEntry({
            transactionId: transaction._id,
            userId: senderWallet.userId,
            walletId: senderWallet._id,
            type: "DEBIT",
            amountEncrypted: String(amount),
            balanceAfterTransactionEncrypted: String(updatedSender.balance)
        });

        // Receiver ledger (CREDIT)
        await ledgerRepo.createLedgerEntry({
            transactionId: transaction._id,
            userId: receiver.userId,
            walletId: receiver._id,
            type: "CREDIT",
            amountEncrypted: String(amount),
            balanceAfterTransactionEncrypted: String(updatedReceiver.balance)
        });

        // ===============================
        // 8. Mark Transaction SUCCESS
        // ===============================
        await transactionRepo.updateTransactionStatus(
            transaction._id,
            "SUCCESS"
        );

        return {
            success: true,
            message: "Transfer completed successfully",
            referenceId: transaction.referenceId
        };

    } catch (error) {

        // ===============================
        // 9. Mark Transaction FAILED
        // ===============================
        await transactionRepo.updateTransactionStatus(
            transaction._id,
            "FAILED"
        );

        throw new Error("Transfer failed: " + error.message);
    }
};


// ===============================
// 7. Block Wallet
// ===============================
const blockWallet = async (walletId) => {
    return await walletRepo.blockWallet(walletId);
};


// ===============================
// 8. Unblock Wallet
// ===============================
const unblockWallet = async (walletId) => {
    return await walletRepo.unblockWallet(walletId);
};


// ===============================
// 9. Get Balance
// ===============================
const getWalletBalance = async (userId) => {

    const wallet = await walletRepo.getActiveWalletByUserId(userId);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    return {
        balance: wallet.balance
    };
};


module.exports = {
    createWallet,
    getUserWallet,
    getWalletByNumber,
    creditWallet,
    debitWallet,
    transferMoney,
    blockWallet,
    unblockWallet,
    getWalletBalance
};