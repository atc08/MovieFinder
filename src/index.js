'use strict'
import './sass/main.scss';
import refs from './js/refs';
import upButtonHandler from './js/upButton';
import fetchPopularMoviesList from './js/initialHomePage';
import searchAndPaginationHomePage from './js/searchAndPaginationHomePage';
import navigationPages from './js/navigation';
import activeDetailsPage from './js/filmDetailsPage';
import openLib from './js/libraryPage';
import openQueue from './js/libraryPage';
import { myInfo } from './js/notification';
// openQueue()
fetchPopularPage();
checkLS();

function checkLS() {
if (!localStorage.getItem('filmsWatched')) {
  localStorage.setItem('filmsWatched', JSON.stringify([]));
}
if (!localStorage.getItem('filmsQueue')) {
  localStorage.setItem('filmsQueue', JSON.stringify([]));
}};

function fetchHomePage(event) {
  event.preventDefault();
  
  const form = event.currentTarget;
  searchAndPaginationHomePage.query = form.elements.query.value;
 
  searchAndPaginationHomePage.resetPage();
  navigationPages.activeHomePage();

  refs.logoRef.addEventListener("click", function(e) {
  if (e.currentTarget === refs.logoRef) {
    form.reset();
  }
});
};

function fetchPopularPage(event) {
  if (event) event.preventDefault();
  
  fetchPopularMoviesList.resetPage();
  navigationPages.createPopularMovieList();
  myInfo()
}

refs.logoRef.addEventListener('click', fetchPopularPage);
refs.homeRef.addEventListener('click', navigationPages.activeHomePage);
refs.lib.addEventListener('click', openLib);
refs.searchForm.addEventListener('submit', fetchHomePage);
refs.homePage.addEventListener('click', activeDetailsPage);
refs.upButton.addEventListener('click', upButtonHandler);


// console.log('в индекс вне ф-ии:',movieId);
// console.log(refs.libWatchedBtn);