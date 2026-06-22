const express = require("express");
const user = require("../models/userModel")

const router = express.Router();

router.get("/signup",(req,res)=>{
    res.send("Signup route hitted")
})

module.exports = router;