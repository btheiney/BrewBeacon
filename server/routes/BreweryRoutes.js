const express = require("express");
const router = express.Router();

// Import any required middleware and controllers
const middleWare = require("../controllers/middleWare");
const breweryController = require("../controllers/BreweryController");

router.post("/checkin", middleWare.checkSession, breweryController.checkIn);
router.get("/:brewery_id/checkin_count", breweryController.getCheckinCount);

module.exports = router;
