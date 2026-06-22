const mongoose = require("mongoose");


const bankSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    bankCode: {
        type: String,
        unique: true
    },

    ifscPrefixes: [{
        type: String
    }],

    status: {
        type: String,
        enum: [
            "ACTIVE",
            "INACTIVE"
        ],
        default: "ACTIVE"
    }
},
    {
        timestamps: true
    });


const Bank = mongoose.model("Bank", bankSchema);

module.exports = { Bank };