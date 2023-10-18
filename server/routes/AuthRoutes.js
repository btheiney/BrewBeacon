const express = require("express");
const router = express.Router();

// Import any required middleware and controllers
const authController = require("../controllers/AuthController");

router.post("/register", authController.registerMember);
router.post("/login", authController.loginMember);
router.get("/ip_address", authController.getVisitorIP);

module.exports = router;
