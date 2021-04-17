/* eslint-disable no-undef */
const mongoose = require("mongoose")
const express = require("express")

require('dotenv').config()

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    const app = express()
    app.use(express.json())

    const AuthController = require('./controllers/auth');
    app.use('/api/auth', AuthController);

    const UserController = require('./controllers/users');
    app.use('/api/users', UserController);

    const ProductController = require('./controllers/products');
    app.use('/api/products', ProductController);

    app.listen(process.env.PORT, () => {
      console.log("Server has started!")
    })

  })
