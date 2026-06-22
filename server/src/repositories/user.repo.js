const { User } = require("../models/userModel");


const createUser = async(data)=>{
    return await User.create(data);
};


const findUserByEmail = async(email)=>{
    return await User.findOne({email});
};


const findUserByMobile = async(mobileNumber)=>{
    return await User.findOne({mobileNumber});
};


module.exports = {
    createUser,
    findUserByEmail,
    findUserByMobile
};