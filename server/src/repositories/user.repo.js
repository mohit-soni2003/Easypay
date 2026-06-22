const { User } = require("../models/userModel");


const createUser = async (data) => {
    return await User.create(data);
};


const findUserByEmail = (email) => {
    return User.findOne({ email }).select("+password");
};

const findUserByMobile = async (mobileNumber) => {
    return User.findOne({ mobileNumber }).select("+password");
};


module.exports = {
    createUser,
    findUserByEmail,
    findUserByMobile
};