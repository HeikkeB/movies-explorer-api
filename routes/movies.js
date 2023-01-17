const routerMovies = require('express').Router();
const { createMovie, getMovies, removeMovie } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

routerMovies.get('/', getMovies);
routerMovies.post('/', createMovieValidation, createMovie);
routerMovies.delete('/:movieId', deleteMovieValidation, removeMovie);

module.exports = routerMovies;
