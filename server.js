/* eslint-disable no-undef */
const mongoose = require("mongoose")
const express = require("express")
const cors = require('cors');
const { authMiddleware } = require('./authMiddleware');
require('dotenv').config()

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    const AuthController = require('./controllers/auth');
    app.use('/api/auth', AuthController);

    const UserController = require('./controllers/users');
    app.use('/api/users', authMiddleware, UserController);

    const ProductController = require('./controllers/products');
    app.use('/api/products', authMiddleware, ProductController);

    const TransactionController = require('./controllers/transactions');
    app.use('/api/transactions', authMiddleware, TransactionController);

    app.listen(process.env.PORT, () => {
      const seeder = require('./seeder');
      seeder.initialSeed()
    })

  })
