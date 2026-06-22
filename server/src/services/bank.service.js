const bankRepo = require("../repositories/bank.repo");

// check duplicate bankCode
// create bank
const createBank = async (data) => {
  const { bankCode } = data;

  const existing = await bankRepo.getBankByCode(bankCode);

  if (existing) {
    throw new Error("Bank with this bankCode already exists");
  }

  const bank = await bankRepo.createBank(data);

  return bank;
};

//get all banks active only
const getAllActiveBanks = async () => {
  const banks = await bankRepo.getAllActiveBanks();
  return banks;
};

//get all banks including inactive admin use only
const getAllBanks = async () => {
  return await bankRepo.getAllBanks();
};

//get bank by id
const getBankById = async (bankId) => {
  const bank = await bankRepo.getBankById(bankId);
  if (!bank) {
    throw new Error("Bank not found");
  }
  return bank;
};

//update bank details
const updateBank = async (bankId, updateData) => {
  const bank = await bankRepo.updateBank(bankId, updateData);
  if (!bank) {
    throw new Error("Bank not found or update failed");
  }
  return bank;
};

//change bank status active/inactive
const changeBankStatus = async (bankId, status) => {
  if (!["ACTIVE", "INACTIVE"].includes(status)) {
    throw new Error("Invalid status");
  }
  const bank = await bankRepo.updateBankStatus(bankId, status);
  if (!bank) {
    throw new Error("Bank not found");
  }
  return bank;
};

//soft delete bank
const deleteBank = async (bankId) => {
  const bank = await bankRepo.softDeleteBank(bankId);
  if (!bank) {
    throw new Error("Bank not found");
  }
  return bank;
};

const searchBanks = async (query) => {
  if (!query) {
    throw new Error("Search query is required");
  }
  const banks = await bankRepo.searchBanks(query);
  return banks;
};

module.exports = {
  createBank,
  getAllActiveBanks,
  getAllBanks,
  getBankById,
  updateBank,
  changeBankStatus,
  deleteBank,
  searchBanks
};