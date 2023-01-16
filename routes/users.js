const routerUsers = require('express').Router();
const {
  getUser, updateUser, getAllUsers, getUserId,
} = require('../controllers/users');

routerUsers.get('/me', getUser);
routerUsers.patch('/me', updateUser);
routerUsers.get('/', getAllUsers);
routerUsers.get('/:userId', getUserId);

module.exports = routerUsers;
