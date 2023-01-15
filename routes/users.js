const routerUsers = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');

routerUsers.get('/me', getUser);
routerUsers.patch('/me', updateUser);

module.exports = routerUsers;
