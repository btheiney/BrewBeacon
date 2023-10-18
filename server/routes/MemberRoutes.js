const express = require("express");
const router = express.Router();

// Import any required middleware and controllers
const middleWare = require("../controllers/middleWare");
const memberController = require("../controllers/MemberController");

router.get(
	"/current",
	middleWare.checkSession,
	memberController.getAuthenticatedMember
);

module.exports = router;
