import mongoose from "mongoose";


const bankSchema = new mongoose.Schema({

name:{
 type:String,
 required:true
},

bankCode:{
 type:String,
 unique:true
},

ifscPrefix:{
 type:String
},

status:{
 type:String,
 enum:[
  "ACTIVE",
  "INACTIVE"
 ],
 default:"ACTIVE"
}


},
{
timestamps:true
});


export default mongoose.model("Bank",bankSchema);