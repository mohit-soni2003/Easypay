const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    createUser,
    findUserByEmail,
    findUserByMobile
} = require("../repositories/user.repo");

const signupService = async (data) => {

    const {
        firstName,
        lastName,
        email,
        mobileNumber,
        password
    } = data;


    const existingEmail = await findUserByEmail(email);

    if (existingEmail)
        throw new Error("Email already registered");


    const existingMobile = await findUserByMobile(mobileNumber);

    if (existingMobile)
        throw new Error("Mobile already registered");


    const hashedPassword = await bcrypt.hash(password, 10);


    return await createUser({
        firstName,
        lastName,
        email,
        mobileNumber,
        password: hashedPassword
    });

};


const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes
const signinService = async (data) => {

    const {
        email,
        password,
        mobileNumber
    } = data;

    let user;

    // 1. Find user by email OR mobile
    if (email) {
        user = await findUserByEmail(email);
    }
    else if (mobileNumber) {
        user = await findUserByMobile(mobileNumber);
    }


    if (!user) {
        throw new Error("Invalid credentials");
    }

    // 2. Check if account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
        throw new Error("Account locked. Try again later.");
    }

    // 3 Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {

        // increment login attempts
        user.loginAttempts = (user.loginAttempts || 0) + 1;

        // lock account if limit reached
        if (user.loginAttempts >= MAX_ATTEMPTS) {
            user.lockUntil = Date.now() + LOCK_TIME;
            user.loginAttempts = 0; // reset after lock
        }

        await user.save();

        throw new Error("Invalid credentials");
    }

    // 4. Reset login attempts on success
    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    // 3. Generate JWT token
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    // 4. Return safe user data
    return {
        token,
        user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobileNumber: user.mobileNumber,
            role: user.role,
            status: user.status
        }
    };
};

module.exports = { signupService, signinService };