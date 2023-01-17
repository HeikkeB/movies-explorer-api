const routerAuth = require('express').Router();
const { createUser, login, signOut } = require('../controllers/users');
const { signupValidation, signinValidation } = require('../middlewares/validation');
const { createAccountLimiter } = require('../middlewares/limiter');

routerAuth.post('/signup', signupValidation, createAccountLimiter, createUser);
routerAuth.post('/signin', signinValidation, login);
routerAuth.post('/signout', signOut);

module.exports = routerAuth;
