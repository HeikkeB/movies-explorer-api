const routerUsers = require('express').Router();
const { getUser } = require('../controllers/users');

routerUsers.get('/me', getUser);

module.exports = routerUsers;
