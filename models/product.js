const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: { type: String, required: true },
  imageURl: String,
  price: { type: Number, required: true },
})

module.exports = mongoose.model("Product", schema)
