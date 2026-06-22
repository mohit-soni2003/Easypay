const bcrypt = require("bcrypt");

const {
    createUser,
    findUserByEmail,
    findUserByMobile
} = require("../repositories/user.repo");


const signupService = async(data)=>{

    const {
        firstName,
        lastName,
        email,
        mobileNumber,
        password
    } = data;


    const existingEmail = await findUserByEmail(email);

    if(existingEmail)
        throw new Error("Email already registered");


    const existingMobile = await findUserByMobile(mobileNumber);

    if(existingMobile)
        throw new Error("Mobile already registered");


    const hashedPassword = await bcrypt.hash(password,10);


    return await createUser({
        firstName,
        lastName,
        email,
        mobileNumber,
        password:hashedPassword
    });

};


module.exports = { signupService };