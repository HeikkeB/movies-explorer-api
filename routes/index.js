const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const routerAuth = require('./auth');
const auth = require('../middlewares/auth');
const { NotFoundErrorRoute } = require('../errors/NotFoundErrorRoute');

router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);
router.use('/', routerAuth);
router.use('*', NotFoundErrorRoute);

module.exports = router;
