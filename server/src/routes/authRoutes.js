const express = require("express");
const router = express.Router();

const {signup} = require("../controllers/auth.controller")

router.post("/signup", signup); // firstName, lastName, email, mobile, password
router.get("/signup", (req, res) => {
    res.json({ message: "GET request for signup" });
}); // firstName, lastName, email, mobile, password

module.exports = router;