const express = require("express");
const router = express.Router();

const {
  getAllActiveBanksController,
  searchBanksController
} = require("../controllers/bank.controller");

router.get("/active", getAllActiveBanksController);
router.get("/search", searchBanksController); 

module.exports = router;