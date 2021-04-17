const express = require('express');
const router = express.Router();

const Transaction = require('../models/transaction');

router.post('/checkout', function (req, res) {
  try {
    const { products, price, quantity, userId } = req.body;
    Transaction.create({ products, quantity, price, broughtBy: userId });
    return res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unprocessable Entity' })
  }
});

router.get('/', async function (req, res) {
  try {
    const { isAdmin, userId } = req.body;
    const query = isAdmin ? {} : { broughtBy: userId };
    const transactions = await Transaction.find(query).lean();
    return res.status(200).json({ success: true, transactions })
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unprocessable Entity' })
  }
});

router.get('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const { isAdmin, userId } = req.body;
    const query = { _id: id, ...(isAdmin ? { broughtBy: userId } : {}) }
    const transaction = await Transaction.findOne(query).lean();

    if (!transaction) return res.status(404).send('Product not found.');

    return res.status(200).json({ success: true, transaction });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Error on the server.' });
  }
});

module.exports = router;
