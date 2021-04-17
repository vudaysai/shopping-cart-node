const express = require("express")
const mongoose = require("mongoose")

require('dotenv').config()

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express()

    app.listen(5000, () => {
      console.log("Shopping Cart Node Server Started")
    })
  })
