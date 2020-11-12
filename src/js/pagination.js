import searchAndPaginationHomePage from './searchAndPaginationHomePage';
import fetchPopularMoviesList from './initialHomePage';
import navigationPages from './navigation';

export function nextBtnHandler() {
  fetchPopularMoviesList.incrementPage();
  navigationPages.createPopularMovieList();
};

export function prevBtnHandler() {
  fetchPopularMoviesList.decrementPage();
  navigationPages.createPopularMovieList();
};

export function nextHomeBtnHandler() {
  searchAndPaginationHomePage.incrementPage();
  navigationPages.activeHomePage();
};

export function prevHomeBtnHandler() {
  searchAndPaginationHomePage.decrementPage();
  navigationPages.activeHomePage();
};