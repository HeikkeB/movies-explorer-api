const routerAuth = require('express').Router();
const { createUser, login, signOut } = require('../controllers/users');
const { signupValidation, signinValidation } = require('../middlewares/validation');

routerAuth.post('/signup', signupValidation, createUser);
routerAuth.post('/signin', signinValidation, login);
routerAuth.post('/signout', signOut);

module.exports = routerAuth;
