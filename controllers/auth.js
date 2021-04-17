/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const SECRET = process.env.JWT_SECRET;

router.post('/register', async function (req, res) {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and Password are required!' });
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const userBody = { name, email, password: hashedPassword };

    await User.create(userBody);
    return res.status(201).json({ success: true, message: 'Registered' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Unprocessable Entity' })
  }
});

router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(404).send('No user found.');

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ success: false, message: 'Invalid Password!' });

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });

    return res.status(200).json({ success: true, token, isAdmin: user.isAdmin });
  } catch (error) {
    return res.status(500).josn({ message: error.message || 'Error on the server.' });
  }
});

module.exports = router;