const CoreBankAccount = require("../models/coreBankAccount.model"); // Adjust path if needed

const coreAccountsData = [
    {
        bankId: "6a38f0e9452b0dc7dd3e5cc2", // SBI
        accountNumberEncrypted: "33221100551", // 11-digit standard
        ifscCode: "SBIN0001234",
        registeredMobileNumber: "9876543210",
        balanceEncrypted: "50000",
        accountType: "SAVING"
    },
    {
        bankId: "6a38f0e9452b0dc7dd3e5cc5", // HDFC
        accountNumberEncrypted: "50100022334455", // 14-digit standard
        ifscCode: "HDFC0000543",
        registeredMobileNumber: "9876543210", // Same user testing
        balanceEncrypted: "120500",
        accountType: "SAVING"
    },
    {
        bankId: "6a38f0e9452b0dc7dd3e5cc3", // BOB
        accountNumberEncrypted: "29380100005610", // 14-digit standard
        ifscCode: "BARB0MUMBAI",
        registeredMobileNumber: "9988776655",
        balanceEncrypted: "15000",
        accountType: "CURRENT"
    },
    {
        bankId: "6a38f0e9452b0dc7dd3e5cc6", // ICICI
        accountNumberEncrypted: "000101234567", // 12-digit standard
        ifscCode: "ICIC0000001",
        registeredMobileNumber: "9988776655", // Same user testing
        balanceEncrypted: "8500",
        accountType: "SAVING"
    },
    {
        bankId: "6a38f0e9452b0dc7dd3e5cc4", // PNB
        accountNumberEncrypted: "1122001500005566", // 16-digit standard
        ifscCode: "PUNB0112200",
        registeredMobileNumber: "7777777777",
        balanceEncrypted: "43000",
        accountType: "SAVING"
    },
    {
        bankId: "6a38f0e9452b0dc7dd3e5cc7", // AXIS
        accountNumberEncrypted: "912010034567890", // 15-digit standard
        ifscCode: "UTIB0000111",
        registeredMobileNumber: "8888888888",
        balanceEncrypted: "320000",
        accountType: "SAVING"
    }
];

const seedCoreAccounts = async () => {
    try {
        console.log("Clearing old core bank accounts...");
        await CoreBankAccount.deleteMany({});

        console.log("Inserting core bank dummy data...");
        await CoreBankAccount.insertMany(coreAccountsData);

        console.log(`✅ Core Accounts Seeding Complete! Inserted ${coreAccountsData.length} accounts.`);
    } catch (error) {
        console.error("❌ Error seeding core accounts:", error);
    }
};

module.exports = seedCoreAccounts;