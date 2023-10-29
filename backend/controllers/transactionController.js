const Transaction = require("../models/Transaction");

exports.getUserTransactions = async (req, res) => {
  const userId = req.user._id; // Assuming the user ID is stored in req.user._id

  try {
    // Find transactions for the specified user
    const transactions = await Transaction.find({ userId })
      .populate("productId", "name price") // Populate the product details
      .exec();

    // Map the transactions array to extract and format the desired information
    const response = transactions.map((transaction) => ({
      transactionId: transaction._id,
      productName: transaction.productId.name,
      productPrice: transaction.productId.price,
    }));

    res.send(response);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Error fetching transactions");
  }
};
