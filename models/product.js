const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: { type: String, required: true },
  imageURL: String,
  price: { type: Number, required: true },
})

module.exports = mongoose.model("Product", schema)
