import refs from './refs';
import searchAndPaginationHomePage from './searchAndPaginationHomePage';
// './js/searchAndPaginationHomePage';
// import searchAndPaginationHomePage from './searchAndPaginationHomePage';
import updateMovieMarkUp from './updateMovieMarkUp';
import { nextBtnHandler, prevBtnHandler, nextHomeBtnHandler, prevHomeBtnHandler } from './pagination';
import fetchPopularMoviesList from './initialHomePage';
import updatePopularMovieMarkUp from './updatePopularMovieMarkUp';
import { myAlert } from './notification'

// - создаем глобальную переменную selectFilm; 
export let selectedMovie = {
  id: 1, 
  // _backdrop_path: 1,
  // get backdrop_path() {
  //   return this._backdrop_path;
  // },
  // set backdrop_path(value) {
  //   this._backdrop_path = value;
  // },
  // original_title: 1, 
  // release_date: 1, 
  // vote_average: 1,
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
  refs.libraryPage.innerHTML = '';
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
  // cleanLibraryPage();
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

// - создаем функцию activeHomePage  которая показывает домашнюю страницу 
//прячет остальные, а также вешает слушателей на кнопку вперед и назад
// из плагинации и удаляет ненужных всех слушателей
//  (таких 4 во всем проекте не нужных на этой странице); 

function activeHomePage() {
  activeMainPage();
  cleanPopularPage();
  cleanHomePage();
  cleanDetailsPage();
  // cleanLibraryPage();
  // refs.libListwWrap.classList.add('is-hidden');
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
// - создаем функцию activeLibraryPage которая показывает страницу
//  с библиотекой и прячет остальные, запускает функцию отрисовки 
//  фильмов из очереди drawQueueFilmList (которую сделает пятый участник) 
//  и добавляет кнопке списка очереди фильмов эффект выбранной с помощью
//   класса, а также вешает слушателей на кнопки показа очереди фильмов
//    и просмотренных фильмов и удаляет ненужных всех слушателей 
//    (таких 4 во всем проекте не нужных на этой странице); 
function activeLibraryPage() {
  cleanHomePage();
  cleanPopularPage();
  cleanDetailsPage();
  // cleanLibraryPage();
  refs.homePage.classList.add('is-hidden');
  refs.searchForm.classList.add('is-hidden');
  refs.libraryPage.classList.remove('is-hidden');
  refs.libBtnList.classList.remove('is-hidden');
  refs.lib.classList.add('activeBtnHeader');
  refs.homeRef.classList.remove('activeBtnHeader');
//   drawQueueFilmList();
//   activeButton();
//   refs.libWatchedBtn.addEventListener('click', handlebuttonW)
//   refs.libQueueBtn.addEventListener('click', handlebuttonQ)
};

// - создаем функцию activeDetailsPage которая показывает страницу 
// детальной отрисовки фильма и прячет остальные, функция принимает 
// два параметра movieId и itsLibraryFilm (это bool), и в зависимости 
// от того это выбранный фильм с домашней страницы или из библиотеки, 
// заполняет глобальную переменную selectFilm нужным объектом и запускает
//  функцию  showDetails c параметром selectFilm который они заполнили
//   одними или другими данными (которую сделает 4й участник), 
//   вешает слушателей на кнопки добавления/удаления фильмов в очередь 
//   просмотра и добавления/удаления фильмов из просмотренных со страницы
//    detailsPage и удаляет ненужных всех слушателей 
//    (таких 4 во всем проекте не нужных на этой странице); 
function activeDetailsPage(movieId, itsLibraryFilm) {
  cleanPopularPage();
  cleanHomePage();
  cleanDetailsPage();
  cleanLibraryPage();
  refs.homePage.classList.add('is-hidden');
  refs.libraryPage.classList.add('is-hidden');
  if (itsLibraryFilm) {
          selectFilm = {
          id: movieId,
          // library: itsLibraryFilm,
      };
  }
  showDetails(selectFilm);
};

export default {createPopularMovieList, activeHomePage, activeLibraryPage, activeDetailsPage}

// - вешаем слушателей на переход на домашнюю страницу и страницу 
// библиотеки в хедере.

// - на логотип повесить запуск функции activeHomePage, 
// чтобы при клике туда возвращаться.

// из DOM достукивается до нужных кнопок участник 3 и вешает функции
// toggleToQueue  и toggleToWatched слушателями на страницу деталей 
// и удаляет там где не нужно.