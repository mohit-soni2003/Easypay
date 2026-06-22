const express = require("express");
const router = express.Router();

const {  getAccountByMobileNumberController,getAccountByAccountNumberAndIfscController} = require("../controllers/coreBankAccount.controller");

router.get("/mobile", getAccountByMobileNumberController);
router.post("/bank-details", getAccountByAccountNumberAndIfscController);//ifsc code and account number

module.exports = router;