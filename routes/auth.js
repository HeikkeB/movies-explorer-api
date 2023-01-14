const routerAuth = require('express').Router();
const { createUser, login, signOut } = require('../controllers/users');

routerAuth.post('/signup', createUser);
routerAuth.post('/signin', login);
routerAuth.post('/signout', signOut);

module.exports = routerAuth;
