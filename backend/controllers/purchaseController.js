const User = require("../models/User");
const Product = require("../models/Product"); // Assuming you have a Product model

exports.purchaseProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    const user = req.user;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }

    // Convert price string "200 Credits" to number
    const creditsToDeduct = Number(product.price.split(" ")[0]);

    if (user.credits < creditsToDeduct) {
      return res.status(400).send({ message: "Insufficient credits." });
    }

    user.credits -= creditsToDeduct;
    await user.save();

    // You can also add logic to record the purchase in another collection if needed
    res.send({ message: "Purchase successful!" });
  } catch (error) {
    console.error("Error purchasing:", error);
    res.status(500).send("Error processing purchase");
  }
};
