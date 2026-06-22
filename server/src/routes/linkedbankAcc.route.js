const express = require("express");
const router = express.Router();

const {  linkBankAccountController} = require("../controllers/LinkedBank.controller");

router.post("/link", linkBankAccountController);

module.exports = router; 