import refs from './refs';
import searchAndPaginationHomePage from './searchAndPaginationHomePage';
import updateMovieMarkUp from './updateMovieMarkUp';
import { nextBtnHandler, prevBtnHandler, nextHomeBtnHandler, prevHomeBtnHandler } from './pagination';
import fetchPopularMoviesList from './initialHomePage';
import updatePopularMovieMarkUp from './updatePopularMovieMarkUp';
import { myAlert } from './notification'

export let selectedMovie = {
  id: 1, 
};
function cleanPopularPage() {
  refs.popularPage.innerHTML = '';
}
function cleanHomePage() {
  refs.moviesContainer.innerHTML = '';
}
function cleanDetailsPage() {
  refs.detailsPage.innerHTML = '';
}
function cleanLibraryPage() {
  refs.libListwWrap.innerHTML= '';
}
function activeMainPage() {
  refs.homePage.classList.remove('is-hidden');
  refs.searchForm.classList.remove('is-hidden');
  refs.btnContainer.classList.remove('is-hidden');
  refs.nextBtn.classList.remove('is-hidden');
}

function createPopularMovieList() {
  activeMainPage();
  cleanHomePage();
  cleanPopularPage();
  cleanDetailsPage();
  cleanLibraryPage();
  refs.libBtnList.classList.add('is-hidden');
  refs.pageBtn.textContent = fetchPopularMoviesList.pageNumber;
  fetchPopularMoviesList.fetchPopularMovies()
    .then(updatePopularMovieMarkUp);
  if (fetchPopularMoviesList.pageNumber !== 1) {
    refs.prevBtn.classList.remove('is-hidden')
  };
  if (fetchPopularMoviesList.pageNumber === 1) {
    refs.prevBtn.classList.add('is-hidden')
  };
  refs.nextHomeBtn.removeEventListener('click', nextHomeBtnHandler);
  refs.prevHomeBtn.removeEventListener('click', prevHomeBtnHandler);
  refs.nextBtn.addEventListener('click', nextBtnHandler);
  refs.prevBtn.addEventListener('click', prevBtnHandler);
}

function activeHomePage() {
  activeMainPage();
  cleanPopularPage();
  cleanHomePage();
  cleanDetailsPage();
  refs.lib.classList.remove('activeBtnHeader');
  refs.homeRef.classList.add('activeBtnHeader');
  refs.libraryPage.classList.add('is-hidden');
  if (!searchAndPaginationHomePage.inputValue) {
    return createPopularMovieList(),
    myAlert();
  };
  searchAndPaginationHomePage.fetchSearchMoviesList()
    .then(updateMovieMarkUp)
  refs.pageBtn.textContent = searchAndPaginationHomePage.pageNumber;
  if (searchAndPaginationHomePage.pageNumber !== 1) {
    refs.prevBtn.classList.remove('is-hidden');
  };
  if (searchAndPaginationHomePage.pageNumber === 1) {
    refs.prevBtn.classList.add('is-hidden');
  };
  refs.nextBtn.removeEventListener('click', nextBtnHandler);
  refs.prevBtn.removeEventListener('click', prevBtnHandler);
  refs.nextHomeBtn.addEventListener('click', nextHomeBtnHandler);
  refs.prevHomeBtn.addEventListener('click', prevHomeBtnHandler);
};

function activeLibraryPage() {
  cleanHomePage();
  cleanPopularPage();
  cleanDetailsPage();
  refs.homePage.classList.add('is-hidden');
  refs.searchForm.classList.add('is-hidden');
  refs.libraryPage.classList.remove('is-hidden');
  refs.libBtnList.classList.remove('is-hidden');
  refs.lib.classList.add('activeBtnHeader');
  refs.homeRef.classList.remove('activeBtnHeader');
};

function activeDetailsPage(movieId, itsLibraryFilm) {
  cleanPopularPage();
  cleanHomePage();
  cleanDetailsPage();
  refs.homePage.classList.add('is-hidden');
  refs.libraryPage.classList.add('is-hidden');
  if (itsLibraryFilm) {
    selectFilm = {
      id: movieId,
    };
  }
  showDetails(selectFilm);
};

export default {createPopularMovieList, activeHomePage, activeLibraryPage, activeDetailsPage}