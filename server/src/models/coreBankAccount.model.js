const mongoose = require("mongoose");

// SIMULATING THE EXTERNAL BANK'S DATABASE
const coreBankAccountSchema = new mongoose.Schema({
    bankId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bank",
        required: true
    },
    accountNumberEncrypted: {
        type: String,
        required: true,
        unique: true
    },
    ifscCode: {
        type: String,
        required: true
    },
    // The mobile number registered at the bank (crucial for UPI fetching)
    registeredMobileNumber: {
        type: String,
        required: true 
    },
    balanceEncrypted: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ["SAVING", "CURRENT"],
        default: "SAVING"
    }
}, { timestamps: true });

module.exports = mongoose.model("CoreBankAccount", coreBankAccountSchema);