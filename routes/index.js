const router = require('express').Router();
const routerUsers = require('./users');

router.use('/users', routerUsers);

module.exports = router;
