const JWT = require('jsonwebtoken');

const User = require('./models/user');
module.exports.authMiddleware = (req, res, next) => {
  const token = req.headers.token
  // eslint-disable-next-line no-undef
  JWT.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (!err) {
      const user = await User.findById(decoded.id).lean()
      if (!user) return res.status(404).json({ errors: 'user not found' })
      req.body.userId = user._id;
      req.body.isAdmin = user.isAdmin;
      return next();
    }
    return res.status(401).json({ errors: 'Invalid token' })
  })
}
