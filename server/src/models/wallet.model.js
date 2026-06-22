import mongoose from "mongoose";


const walletSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },


    walletNumber:{
        type:String,
        unique:true,
        required:true
    },


    balanceEncrypted:{
        type:String,
        default:"0"
    },


    status:{
        type:String,
        enum:[
            "ACTIVE",
            "BLOCKED"
        ],
        default:"ACTIVE"
    }

},
{
    timestamps:true,
    versionKey:false
});


export default mongoose.model(
    "Wallet",
    walletSchema
);