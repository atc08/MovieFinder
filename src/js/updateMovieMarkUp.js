import fetchMovieTpl from '../templates/fetchMovie.hbs';
import refs from './refs';

function updateMovieMarkUp(results) {
  const markUp = fetchMovieTpl(results); 
  refs.moviesContainer.insertAdjacentHTML('beforeend', markUp);
}

export default updateMovieMarkUp;