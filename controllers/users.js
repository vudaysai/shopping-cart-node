const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async function (req, res) {
  try {
    const users = await User.find({ isAdmin: false }).select(['-password', '-isAdmin']).lean();
    return res.status(200).json({ success: true, users })
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unprocessable Entity' })
  }
});

router.get('/:id', async function (req, res) {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id }).select(['-password', '-isAdmin']).lean();
    if (!user) return res.status(404).send('No user found.');

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Error on the server.' });
  }
});

module.exports = router;