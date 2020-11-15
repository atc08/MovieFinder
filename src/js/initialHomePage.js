import { myError } from './notification';

const apiKey = "2e7ddd707cda482bd62363d7d16dcf77";

export default {
  inputValue: '',
  pageNumber: 1,
  newUrl: null,
  fetchPopularMovies() {

  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en&page=${this.pageNumber}`;

  return fetch(url)
  .then(response => response.json())
    .then(({ results }) => {
      return results;    
  })
  .catch(error => myError(error));
  },
  updateURL() {
      this.newUrl = new URL(`http://localhost:4040/?page=${this.pageNumber}`);
    return this.newUrl;
  },

  resetPage() {
    this.pageNumber = 1;
    this.updateURL();
  },
  incrementPage() {
    this.pageNumber += 1;
    this.updateURL();
  },
  decrementPage() {
    if (this.pageNumber === 1) return;
    this.pageNumber -= 1;
    this.updateURL();
  },
} 