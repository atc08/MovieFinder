import fetchPopularMovieTpl from '../templates/popularMovie.hbs';
import refs from './refs';

function updatePopularMovieMarkUp(results) {
  const markUp = fetchPopularMovieTpl(results); 
  refs.popularPage.insertAdjacentHTML('beforeend', markUp);
}

export default updatePopularMovieMarkUp;