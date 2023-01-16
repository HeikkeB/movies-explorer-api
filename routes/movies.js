const routerMovies = require('express').Router();
const { createMovie, getMovies, removeMovie } = require('../controllers/movies');

routerMovies.post('/', createMovie);
routerMovies.get('/', getMovies);
routerMovies.delete('/:movieId', removeMovie);

module.exports = routerMovies;
