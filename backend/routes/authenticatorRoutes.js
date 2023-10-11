const express = require("express");
const router = express.Router();
const authenticatorController = require("../controllers/authenticatorController");
const authMiddleware = require("../middlewares/auth");


// Define a route for enabling 2FA
router.post('/enable-2fa', authenticationController.enable2FA);

// Route for verifying 2FA
router.post('/verify-2fa', authController.verify2FA);

module.exports = router;