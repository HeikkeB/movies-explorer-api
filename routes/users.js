const routerUsers = require('express').Router();
const {
  getUser, updateUser,
} = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

routerUsers.get('/me', getUser);
routerUsers.patch('/me', updateUserValidation, updateUser);

module.exports = routerUsers;
