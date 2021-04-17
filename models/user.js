const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
})

module.exports = mongoose.model("User", schema)