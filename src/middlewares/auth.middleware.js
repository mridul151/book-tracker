const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ error: 'Invalid token' });
      }
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Authorization header missing' });
  }
};

module.exports = authenticateUser;