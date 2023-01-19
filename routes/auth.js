const routerAuth = require('express').Router();
const { createUser, login, signOut } = require('../controllers/users');
const { signupValidation, signinValidation } = require('../middlewares/validation');
const { createAccountLimiter } = require('../middlewares/limiter');
const auth = require('../middlewares/auth');

routerAuth.post('/signup', signupValidation, createAccountLimiter, createUser);
routerAuth.post('/signin', signinValidation, login);
routerAuth.post('/signout', auth, signOut);

module.exports = routerAuth;
