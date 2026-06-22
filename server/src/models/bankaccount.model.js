import mongoose from "mongoose";


const bankAccountSchema = new mongoose.Schema({

userId:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User",
 required:true
},


bankId:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"Bank",
 required:true
},

isPrimary: {
    type: Boolean,
    default: false
},
accountNumberEncrypted:{
 type:String,
 required:true
},


balanceEncrypted:{
 type:String,
 required:true
},


accountType:{
 type:String,
 enum:["SAVING","CURRENT"],
 default:"SAVING"
},


status:{
 type:String,
 enum:["ACTIVE","BLOCKED"],
 default:"ACTIVE"
}


},
{
timestamps:true
});


export default mongoose.model(
"BankAccount",
bankAccountSchema
);