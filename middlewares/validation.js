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
        
    })
})

module.exports = { updateUserValidation };
