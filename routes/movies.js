const routerMovies = require('express').Router();
const { createMovie, getMovies } = require('../controllers/movies');

routerMovies.post('/', createMovie);
routerMovies.get('/', getMovies);

module.exports = routerMovies;
