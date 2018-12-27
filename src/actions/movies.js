import constants from '../constants/constants'
import api from "../api";

// data.entities.books
const moviesFetched = movies => ({
  type: constants.MOVIES_FETCHED,
  movies
});

const movieCreated = movie => ({
  type: constants.MOVIE_CREATED,
  movie
});


const clearAllMovies = movie => ({
  type: constants.CLEAR_ALL_MOVIES,
  movie
});

export const fetchMovies = userId => dispatch => {

    api.movie
      .fetchAll( userId )
      .then(movies => {
        dispatch(moviesFetched(movies))
        } 
      )
  }
  ;


export const addNewMovie = data => dispatch =>
  api.movie
    .addMovie(data)
    .then(movie => dispatch(movieCreated(movie)));

export const clearList = userId => dispatch =>
  api.movie
    .clearAllMovies(userId)
    .then(movie => dispatch(clearAllMovies(movie)));

