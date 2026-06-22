const { signupService } = require("../services/auth.service");

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

module.exports = { signup };