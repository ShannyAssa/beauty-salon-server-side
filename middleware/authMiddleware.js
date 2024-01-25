const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('Authorization');
  console.log(req.header);
  console.log('Token: ', token);

  // Check if there's no token
  if (!token) {
    console.log('no token - authorization denied');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  jwt.verify(token.replace('Bearer ', ''), secretKey, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.sendStatus(403);
    }
    req.user = user;
    console.log(req.user);
    next();
  });

};

module.exports = authMiddleware;
