const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");
const authMiddleware = require("../middlewares/auth"); // Your JWT middleware

router.post(
  "/purchaseItem",
  authMiddleware,
  purchaseController.purchaseProduct
);

module.exports = router;
