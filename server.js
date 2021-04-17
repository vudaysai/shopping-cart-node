/* eslint-disable no-undef */
const mongoose = require("mongoose")
const express = require("express")

require('dotenv').config()

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express()
    app.use(express.json())

    const AuthController = require('./controllers/auth');
    app.use('/api/auth', AuthController);

    app.listen(process.env.PORT, () => {
      console.log("Server has started!")
    })

  })
