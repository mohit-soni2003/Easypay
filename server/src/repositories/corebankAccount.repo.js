const CoreBankAccount = require("../models/coreBankAccount.model");

// 1. Find account by registered mobile number
const getAccountByMobileNumber = async (mobileNumber) => {
  return await CoreBankAccount.findOne({
    registeredMobileNumber: mobileNumber
  });
};

// 2. Find account by account number + IFSC code
const getAccountByAccountNumberAndIfsc = async (accountNumberEncrypted, ifscCode) => {
  return await CoreBankAccount.findOne({
    accountNumberEncrypted,
    ifscCode
  });
};

module.exports = {
  getAccountByMobileNumber,
  getAccountByAccountNumberAndIfsc
};