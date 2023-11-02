const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// // Add a new product
// router.post("/add", productController.addProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get a specific product by name
router.get("/:name", productController.getProductByName);

// // Update a specific product by its ID
// router.put("/update/:productId", productController.updateProduct);

// // Delete a specific product by its ID
// router.delete("/delete/:productId", productController.deleteProduct);

module.exports = router;
