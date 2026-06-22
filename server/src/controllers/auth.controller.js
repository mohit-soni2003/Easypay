const { signupService, signinService } = require("../services/auth.service");
const setTokenCookie  =  require("../utility/setCookies");

const signup = async (req, res) => {
    console.log("Signup request body:", req.body);
    try {
        const user = await signupService(req.body);
        console.log("User created:", user);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const signin = async (req, res) => {

    try {
        const result = await signinService(req.body);
        setTokenCookie(res, result.token);
        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { signup, signin };