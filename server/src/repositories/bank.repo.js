const { Bank } = require("../models/bank.model");

const createBank = async (data) => {
  return await Bank.create(data);
};

const getBankById = async (bankId) => {
  return await Bank.findById(bankId);
};

const getBankByCode = async (bankCode) => {
  return await Bank.findOne({ bankCode });
};

const getAllActiveBanks = async () => {
  return await Bank.find({ status: "ACTIVE" }).sort({ createdAt: -1 });
};

const getAllBanks = async () => {
  return await Bank.find().sort({ createdAt: -1 });
};

const updateBank = async (bankId, updateData) => {
  return await Bank.findByIdAndUpdate(
    bankId,
    { $set: updateData },
    { new: true }
  );
};

const updateBankStatus = async (bankId, status) => {
  return await Bank.findByIdAndUpdate(
    bankId,
    { status },
    { new: true }
  );
};

const softDeleteBank = async (bankId) => {
  return await Bank.findByIdAndUpdate(
    bankId,
    { status: "INACTIVE" },
    { new: true }
  );
};

const searchBanks = async (query) => {
  return await Bank.find({
    name: { $regex: query, $options: "i" }
  });
};

const bankExists = async (bankCode) => {
  const bank = await Bank.findOne({ bankCode });
  return !!bank;
};

module.exports = {
  createBank,
  getBankById,
  getBankByCode,
  getAllActiveBanks,
  getAllBanks,
  updateBank,
  updateBankStatus,
  softDeleteBank,
  searchBanks,
  bankExists
};