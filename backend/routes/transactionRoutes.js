// routes/transactionRoutes.js

const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");

const authMiddleware = require("../middlewares/auth"); // Your JWT middleware

// Define the route to get a user's transactions
router.get(
  "/transactionsbyuser",
  authMiddleware,
  TransactionController.getUserTransactions
);

module.exports = router;
