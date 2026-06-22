const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema({

senderId:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User"
},


receiverId:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User"
},


// Bank accounts involved
senderAccountId:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"BankAccount"
},


receiverAccountId:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"BankAccount"
},


// Wallets involved
senderWalletId:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"Wallet"
},


receiverWalletId:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"Wallet"
},



amountEncrypted:{
 type:String,
 required:true
},


transactionType:{
 type:String,

 enum:[
  "BANK_TO_BANK",
  "WALLET_TO_WALLET",
  "BANK_TO_WALLET",
  "WALLET_TO_BANK"
 ]

},


status:{
 type:String,

 enum:[
 "PENDING",
 "SUCCESS",
 "FAILED"
 ],

 default:"PENDING"
},


referenceId:{
 type:String,
 unique:true
},


description:{
 type:String
}


},
{
timestamps:true
});


module.exports = mongoose.model(
"Transaction",
transactionSchema
);