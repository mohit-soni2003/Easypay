const LinkedAccount = require("../models/linkedAccount.model");

// 1. Find all linked accounts of a user
const getLinkedAccountsByUserId = async (userId) => {
  return await LinkedAccount.find({
    userId
  }).populate("coreBankAccountId");
};

// 2. Find single linked account by user + core bank account
const getLinkedAccountByUserAndAccount = async (userId, coreBankAccountId) => {
  return await LinkedAccount.findOne({
    userId,
    coreBankAccountId
  });
};

// 3. Make account primary
const makeAccountPrimary = async (userId, accountId) => {
  // remove existing primary account
  await LinkedAccount.updateMany(
    {
      userId
    },
    {
      isPrimary: false
    }
  );

  // set selected account primary
  return await LinkedAccount.findOneAndUpdate(
    {
      _id: accountId,
      userId
    },
    {
      isPrimary: true
    },
    {
      new: true
    }
  );
};


// 4. Remove account primary
const removeAccountPrimary = async (userId, accountId) => {

  return await LinkedAccount.findOneAndUpdate(
    {
      _id: accountId,
      userId
    },
    {
      isPrimary: false
    },
    {
      new: true
    }
  );

};


// 5. Set UPI PIN
const setUpiPin = async (userId, accountId, encryptedPin) => {

  return await LinkedAccount.findOneAndUpdate(
    {
      _id: accountId,
      userId
    },
    {
      upiPinEncrypted: encryptedPin
    },
    {
      new: true
    }
  );

};


// 6. Remove UPI PIN
const removeUpiPin = async (userId, accountId) => {

  return await LinkedAccount.findOneAndUpdate(
    {
      _id: accountId,
      userId
    },
    {
      $unset: {
        upiPinEncrypted: ""
      }
    },
    {
      new: true
    }
  );

};


// 7. Get primary account of user
const getPrimaryAccountByUserId = async (userId) => {

  return await LinkedAccount.findOne({
    userId,
    isPrimary: true,
    status: "ACTIVE"
  });

};


// 8. Block linked account
const blockLinkedAccount = async (userId, accountId) => {

  return await LinkedAccount.findOneAndUpdate(
    {
      _id: accountId,
      userId
    },
    {
      status: "BLOCKED"
    },
    {
      new: true
    }
  );

};


// 9. Activate linked account
const activateLinkedAccount = async (userId, accountId) => {

  return await LinkedAccount.findOneAndUpdate(
    {
      _id: accountId,
      userId
    },
    {
      status: "ACTIVE"
    },
    {
      new: true
    }
  );

};


// 10. Link bank account to user
const createLinkedAccount = async (data) => {
  return await LinkedAccount.create(data);
};

module.exports = {

  getLinkedAccountsByUserId,
  getLinkedAccountByUserAndAccount,

  makeAccountPrimary,
  removeAccountPrimary,

  setUpiPin,
  removeUpiPin,

  getPrimaryAccountByUserId,

  blockLinkedAccount,
  activateLinkedAccount,
  createLinkedAccount

};