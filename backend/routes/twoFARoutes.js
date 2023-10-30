// routes/index.js
const express = require("express");
const twoFAController = require("../controllers/twoFAController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/generate-secret", authMiddleware, twoFAController.generateSecret);
router.post("/verify-token", authMiddleware, twoFAController.verifyToken);
router.post("/verify-2fa", twoFAController.verify2FAAndLogin);
router.post("/disable2fa", authMiddleware, twoFAController.disable2FA);

module.exports = router;
