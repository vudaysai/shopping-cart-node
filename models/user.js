const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator')

const schema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    validate: {
      validator: isEmail,
      message: '{VALUE} is not a valid email'
    },
    unique: true,
    required: true
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
})
schema.plugin(uniqueValidator)

module.exports = mongoose.model("User", schema)