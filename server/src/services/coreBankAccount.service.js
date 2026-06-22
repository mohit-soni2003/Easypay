const {getAccountByMobileNumber,getAccountByAccountNumberAndIfsc} = require("../repositories/coreBankAccount.repo");

/**
 * 1. Get account by registered mobile number
 */
const getAccountByMobileNumberService = async (mobileNumber) => {
  try {
    if (!mobileNumber) {
      throw new Error("Mobile number is required");
    }

    const account = await getAccountByMobileNumber(mobileNumber);

    if (!account) {
      throw new Error("Account not found for this mobile number");
    }

    return account;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * 2. Get account by account number + IFSC code
 */
const getAccountByAccountNumberAndIfscService = async (accountNumberEncrypted, ifscCode) => {
  try {
    if (!accountNumberEncrypted || !ifscCode) {
      throw new Error("Account number and IFSC code are required");
    }

    const account =
      await getAccountByAccountNumberAndIfsc(
        accountNumberEncrypted,
        ifscCode
      );

    if (!account) {
      throw new Error("Account not found with given details");
    }

    return account;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAccountByMobileNumberService,
  getAccountByAccountNumberAndIfscService
};