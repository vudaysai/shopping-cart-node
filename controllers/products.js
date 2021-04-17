const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one product
router.post("/", async (req, res) => {
  const { name, imageURl, price } = req.body;
  const product = new Product({
    name, imageURl, price
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get one Product
router.get("/:id", getProduct, (req, res) => {
  res.json(res.product);
});

// Update one Product
router.patch("/:id", async (req, res) => {
  try {
    const { name, imageURl, price } = req.body;
    const updatedProduct = await Product.findOneAndUpdate({ _id: req.params.id }, { name, imageURl, price }, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one product
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: "Deleted product" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// function to fetch single Product
async function getProduct (req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cant find product" });
    }
    res.product = product;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;