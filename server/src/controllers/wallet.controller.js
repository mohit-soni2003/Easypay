const walletService = require("../services/wallet.service");


// ===============================
// 1. Create Wallet (Signup)
// ===============================
const createWallet = async (req, res) => {

    try {
        const { userId, walletNumber } = req.body;

        if (!userId || !walletNumber) {
            return res.status(400).json({
                success: false,
                message: "userId and walletNumber are required"
            });
        }

        const wallet = await walletService.createWallet(userId, walletNumber);

        return res.status(201).json({
            success: true,
            message: "Wallet created successfully",
            data: wallet
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// 2. Get User Wallet
// ===============================
const getUserWallet = async (req, res) => {

    try {
        const userId = req.params.userId;

        const wallet = await walletService.getUserWallet(userId);

        return res.status(200).json({
            success: true,
            message: "Wallet fetched successfully",
            data: wallet
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// 3. Get Wallet by Number
// ===============================
const getWalletByNumber = async (req, res) => {

    try {
        const { walletNumber } = req.params;

        const wallet = await walletService.getWalletByNumber(walletNumber);

        return res.status(200).json({
            success: true,
            message: "Wallet fetched successfully",
            data: wallet
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// 4. Credit Wallet
// ===============================
const creditWallet = async (req, res) => {

    try {
        const { walletId, amount } = req.body;

        const updatedWallet = await walletService.creditWallet(walletId, amount);

        return res.status(200).json({
            success: true,
            message: "Amount credited successfully",
            data: updatedWallet
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// 5. Debit Wallet
// ===============================
const debitWallet = async (req, res) => {

    try {
        const { walletId, amount } = req.body;

        const updatedWallet = await walletService.debitWallet(walletId, amount);

        return res.status(200).json({
            success: true,
            message: "Amount debited successfully",
            data: updatedWallet
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// 6. Transfer Money
// ===============================
const transferMoney = async (req, res) => {

    try {
        const { fromWalletId, toWalletNumber, amount } = req.body;

        const result = await walletService.transferMoney(
            fromWalletId,
            toWalletNumber,
            amount
        );

        return res.status(200).json({
            success: true,
            message: result.message,
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// 7. Block Wallet
// ===============================
const blockWallet = async (req, res) => {

    try {
        const { walletId } = req.params;

        const wallet = await walletService.blockWallet(walletId);

        return res.status(200).json({
            success: true,
            message: "Wallet blocked successfully",
            data: wallet
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// 8. Unblock Wallet
// ===============================
const unblockWallet = async (req, res) => {

    try {
        const { walletId } = req.params;

        const wallet = await walletService.unblockWallet(walletId);

        return res.status(200).json({
            success: true,
            message: "Wallet unblocked successfully",
            data: wallet
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// 9. Get Balance
// ===============================
const getWalletBalance = async (req, res) => {

    try {
        const userId = req.params.userId;

        const balance = await walletService.getWalletBalance(userId);

        return res.status(200).json({
            success: true,
            message: "Balance fetched successfully",
            data: balance
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ===============================
// Export Controller
// ===============================
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