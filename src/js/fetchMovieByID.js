import { myError } from './notification';

const apiKey = "2e7ddd707cda482bd62363d7d16dcf77";

function fetchMovieByID(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`;

  return fetch(url)
    .then(response => response.json())
    .catch(error => myError(error));
}

export default fetchMovieByID;