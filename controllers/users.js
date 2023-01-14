/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

// signup
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.status(201).send({
      email, name, _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(err);
      } else if (err.code === 11000) {
        next(err);
      } else {
        next(err);
      }
    });
};

// signin
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        expires: new Date(Date.now() + 12 * 3600000),
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      res.send({ message: 'Authorization was successful!' });
    })
    .catch((err) => {
      if (err.message === 'IncorrectEmail') {
        return next(err);
      }
      next(err);
    });
};

// signout
module.exports.signOut = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'You are logout!' })
    .catch(next);
};
