const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const {
  JWT_SECRET_DEV,
  BAD_REQUEST_MESSAGE,
  CONFLICT_MESSAGE,
  NOTFOUND_MESSAGE,
} = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

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
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictError(`${email} ${CONFLICT_MESSAGE}`));
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
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, {
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
    .catch(next);
};

// signout
module.exports.signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'You are logout!' });
};

// get user
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(NOTFOUND_MESSAGE))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError(NOTFOUND_MESSAGE))
    .then((user) => {
      res.send({
        name, email, _id: user._id,
      });
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};
