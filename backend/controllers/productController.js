const Product = require("../models/Product");

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, image } = req.body;
  try {
    const productExists = await Product.findOne({ name });
    if (productExists) return res.status(400).send("Product already exists");

    const product = new Product({
      name,
      description,
      price,
      image,
    });

    await product.save();
    res.status(201).send("Product added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong when adding product");
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong when fetching products");
  }
};

// Get product by name
exports.getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Product.findOne({ name });

    if (!product) return res.status(404).send("Product not found");

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong when fetching product");
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedFields = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    for (let key in updatedFields) {
      product[key] = updatedFields[key];
    }

    await product.save();
    res.status(200).send("Product updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while updating product");
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    await product.remove();
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while deleting product");
  }
};
