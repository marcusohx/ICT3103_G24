// controllers/purchaseController.js

const mongoose = require("mongoose");
const User = require("../models/User");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction"); // Import the Transaction model

exports.purchaseProduct = async (req, res) => {
  const { productId } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = req.user;
    const product = await Product.findById(productId);

    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({ message: "Product not found." });
    }

    const creditsToDeduct = Number(product.price.split(" ")[0]);

    if (user.credits < creditsToDeduct) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send({ message: "Insufficient credits." });
    }

    user.credits -= creditsToDeduct;
    await user.save({ session });

    const transaction = new Transaction({
      userId: user._id,
      productId: product._id,
    });
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.send({ message: "Purchase successful!" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error purchasing:", error);
    res.status(500).send("Error processing purchase");
  }
};
