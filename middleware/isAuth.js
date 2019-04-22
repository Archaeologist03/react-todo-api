const config = require('config');
const jwt = require('jsonwebtoken');

function isAuth(req, res, next) {
  const token = req.header('x-auth-token');

  // check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // add user to payload. To every request/route that uses this middleware
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = isAuth;
