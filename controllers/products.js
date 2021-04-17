const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const checkIfAdmin = (req, res, next) => {
  const { isAdmin } = req.body;
  if (!isAdmin) return res.status(401).json({ message: 'unauthorized' });
  return next()
}
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
router.post("/", checkIfAdmin, async (req, res) => {
  const { name, imageURL, price, } = req.body;
  const product = new Product({
    name, imageURL, price
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
router.patch("/:id", checkIfAdmin, async (req, res) => {
  try {
    const { name, imageURL, price } = req.body;
    const updatedProduct = await Product.findOneAndUpdate({ _id: req.params.id }, { name, imageURL, price }, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one product
router.delete("/:id", checkIfAdmin, getProduct, async (req, res) => {
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