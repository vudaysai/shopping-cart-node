const User = require('./models/user');
const Product = require('./models/product');
const bcrypt = require('bcrypt');

module.exports.initialSeed = async () => {
  const users = await User.find().lean();
  if (!users.length) {
    await User.insertMany([
      {
        "isAdmin": true,
        "name": "Admin",
        "email": "admin@cart.com",
        "password": bcrypt.hashSync("admin@9001", 8),
      },
      {
        "isAdmin": false,
        "name": "User",
        "email": "user@cart.com",
        "password": bcrypt.hashSync("user@9001", 8),
      }
    ])
  }

  const products = await Product.find().lean();
  if (!products.length) {
    await Product.insertMany([
      {
        "name": "Penguin",
        "price": 50,
        "imageURL": "https://www.gstatic.com/webp/gallery3/2.png"
      },
      {
        "name": "Rose",
        "price": 50,
        "imageURL": "https://www.gstatic.com/webp/gallery3/1.png"
      },
      {
        "name": "Dice",
        "price": 50,
        "imageURL": "https://www.gstatic.com/webp/gallery3/3.png"
      }
    ])
  }
}
