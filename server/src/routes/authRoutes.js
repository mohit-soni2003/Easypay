const express = require("express");
const router = express.Router();

const {signup,signin} = require("../controllers/auth.controller")

router.post("/signup", signup); // firstName, lastName, email, mobile, password

router.post("/signin", signin); // email, password

module.exports = router;