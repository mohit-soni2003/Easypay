const express = require("express");
const router = express.Router();

const walletController = require("../controllers/wallet.controller");


// ===============================
// Wallet Creation
// ===============================
router.post("/create", walletController.createWallet);


// ===============================
// Get User Wallet (dashboard)
// ===============================
router.get("/user/:userId", walletController.getUserWallet);


// ===============================
// Get Wallet by Wallet Number
// ===============================
router.get("/number/:walletNumber", walletController.getWalletByNumber);


// ===============================
// Credit Wallet
// ===============================
router.post("/credit", walletController.creditWallet);


// ===============================
// Debit Wallet
// ===============================
router.post("/debit", walletController.debitWallet);


// ===============================
// Transfer Money (P2P)
// ===============================
router.post("/transfer", walletController.transferMoney);


// ===============================
// Block Wallet (Admin/Security)
// ===============================
router.patch("/block/:walletId", walletController.blockWallet);


// ===============================
// Unblock Wallet
// ===============================
router.patch("/unblock/:walletId", walletController.unblockWallet);


// ===============================
// Get Wallet Balance
// ===============================
router.get("/balance/:userId", walletController.getWalletBalance);


module.exports = router;