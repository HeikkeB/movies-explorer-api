const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/UnauthorizedError');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new Unauthorized('Authorization required!'));
  } else {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      next();
    } catch (err) {
      next(new Unauthorized('Authorization required'));
    }
  }
};
