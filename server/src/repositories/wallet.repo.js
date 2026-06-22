const Wallet = require("../models/wallet.model");


// Create Wallet during signup
const createWallet = async (userId, walletNumber) => {
    const wallet = new Wallet({
        userId,
        walletNumber,
        balanceEncrypted: "0",
        status: "ACTIVE"
    });
    return await wallet.save();
};

// Get wallet using userId
const getWalletByUserId = async (userId) => {
    return await Wallet.findOne({
        userId
    });
};

// Get wallet using wallet number
const getWalletByWalletNumber = async (walletNumber) => {
    return await Wallet.findOne({
        walletNumber
    });
};

// Get wallet by walletId
const getWalletById = async (walletId) => {
    return await Wallet.findById(walletId);
};

// Check wallet exists
const walletExists = async (userId) => {
    return await Wallet.exists({
        userId
    });
};

// Get only active wallet
const getActiveWalletByUserId = async (userId) => {
    return await Wallet.findOne({
        userId,
        status: "ACTIVE"
    });
};

// Update wallet status
// ACTIVE / BLOCKED / SUSPENDED

const updateWalletStatus = async (walletId, status) => {
    return await Wallet.findByIdAndUpdate(
        walletId,
        {
            status
        },
        {
            new:true
        }
    );
};

// Update complete balance
const updateWalletBalance = async (
    walletId,
    encryptedBalance
)=>{
    return await Wallet.findByIdAndUpdate(
        walletId,
        {
            balanceEncrypted: encryptedBalance
        },
        {
            new:true
        }
    );
};

// Increase balance
// Used for add money / receiving money

const increaseWalletBalance = async (
    walletId,
    amount
)=>{

    return await Wallet.findByIdAndUpdate(
        walletId,
        {
            $inc:{
                balance: amount
            }
        },
        {
            new:true
        }
    );
};

// Decrease balance
// Used for payments / transfers

const decreaseWalletBalance = async (
    walletId,
    amount
)=>{
    return await Wallet.findByIdAndUpdate(
        walletId,
        {
            $inc:{
                balance: -amount
            }
        },
        {
            new:true
        }
    );
};

// Lock wallet
const blockWallet = async(walletId)=>{

    return await Wallet.findByIdAndUpdate(
        walletId,
        {
            status:"BLOCKED"
        },
        {
            new:true
        }
    );
};

// Unlock wallet

const unblockWallet = async(walletId)=>{

    return await Wallet.findByIdAndUpdate(
        walletId,
        {
            status:"ACTIVE"
        },
        {
            new:true
        }
    );
};

// Delete wallet
// Better use soft delete in banking apps

const deleteWallet = async(walletId)=>{
    return await Wallet.findByIdAndDelete(walletId);
};



module.exports = {
    createWallet,
    getWalletByUserId,
    getWalletByWalletNumber,
    getWalletById,
    walletExists,
    getActiveWalletByUserId,
    updateWalletStatus,
    updateWalletBalance,
    increaseWalletBalance,
    decreaseWalletBalance,
    blockWallet,
    unblockWallet,
    deleteWallet
};