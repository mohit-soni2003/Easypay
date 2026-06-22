const {
  getAccountByMobileNumberService,
  getAccountByAccountNumberAndIfscService
} = require("../services/coreBankAccount.service");

/**
 * 1. Controller: Get account by mobile number
 */
const getAccountByMobileNumberController = async (req, res) => {
  try {
    const { mobileNumber } = req.query;

    const account = await getAccountByMobileNumberService(mobileNumber);

    return res.status(200).json({
      success: true,
      message: "Account fetched successfully by mobile number",
      data: account
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * 2. Controller: Get account by account number + IFSC code
 */
const getAccountByAccountNumberAndIfscController = async (req, res) => {
  try {
    const { accountNumberEncrypted, ifscCode } = req.body;

    const account =
      await getAccountByAccountNumberAndIfscService(
        accountNumberEncrypted,
        ifscCode
      );

    return res.status(200).json({
      success: true,
      message: "Account fetched successfully by account details",
      data: account
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAccountByMobileNumberController,
  getAccountByAccountNumberAndIfscController
};