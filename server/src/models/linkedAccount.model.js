const mongoose = require("mongoose");

// YOUR APP'S LINKED ACCOUNTS
const linkedAccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // The reference to the external bank account
    coreBankAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CoreBankAccount",
        required: true
    },
    // To show the user "HDFC - 4321" in the UI without decrypting the whole number
    maskedAccountNumber: {
        type: String, 
        required: true
    },
    isPrimary: {
        type: Boolean,
        default: false
    },
    // Real UPI apps require a PIN to authorize a link/transfer
    upiPinEncrypted: {
        type: String,
        required: false 
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCKED"],
        default: "ACTIVE"
    }
}, { timestamps: true });

module.exports = mongoose.model("LinkedAccount", linkedAccountSchema);