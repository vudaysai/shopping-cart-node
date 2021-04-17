const mongoose = require("mongoose")

const schema = mongoose.Schema({
  products: Array,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  broughtBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, { timestamps: true })

module.exports = mongoose.model("Transaction", schema)
