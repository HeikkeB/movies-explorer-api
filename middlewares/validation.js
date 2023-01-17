const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const methodEmail = (value) => {
  const result = validator.isEmail(value);
  if (result) {
    return value;
  }
  throw new Error('Email validation err');
};

const methodUrl = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Url validation err');
};

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom(methodEmail),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(methodUrl),
    trailerLink: Joi.string().required().custom(methodUrl),
    thumbnail: Joi.string().required().custom(methodUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(methodEmail),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(methodEmail),
    password: Joi.string().required(),
  }),
});

module.exports = {
  updateUserValidation,
  createMovieValidation,
  deleteMovieValidation,
  signupValidation,
  signinValidation,
};
