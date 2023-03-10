const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/UnauthorizedError');
const { JWT_SECRET_DEV, UNAUTHORIZE_MESSAGE } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new Unauthorized(UNAUTHORIZE_MESSAGE));
  } else {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
      req.user = payload;
      next();
    } catch (err) {
      next(new Unauthorized(UNAUTHORIZE_MESSAGE));
    }
  }
};
