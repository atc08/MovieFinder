
import libPageTempl from '../templates/libPage.hbs';
import refs from './refs';
import navigationPages from './navigation';
import {toStorage, fromStorage} from './utilities';
import selectMovie from './filmDetailsPage';
import selectedMovie from './filmDetailsPage';
import selectFilm from './navigation';
import { myError } from './notification'; 
// import {movieId} from './filmDetailsPage';


import activeDetailsPage from './filmDetailsPage';
// import { activeHomePage, activeLibraryPage, /*activeDetailsPage*/} from './3navigation';
// import {createPopularMovieList} from '../index';
// import activeDetailsPage from './js/4filmDetailsPage';
// console.log('в библиотеке вне ф-ии:',movieId);
function openLib() {
  navigationPages.activeLibraryPage();
//   const apiKey = "2e7ddd707cda482bd62363d7d16dcf77";
//  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18&primary_release_year=2019`;

  // fetch(url)
  // .then(response => response.json())
    // .then(({ results }) => {
      // console.log(results)

      const parsedWatched = JSON.parse(localStorage.getItem('filmsWatched'));
      const parsedQueue = JSON.parse(localStorage.getItem('filmsQueue'));

      function openQueue() {
        // refs.libraryPage.innerHTML ="";
        refs.libListwWrap.innerHTML ="";
        const markUp = libPageTempl(parsedQueue);
        refs.libListwWrap.insertAdjacentHTML('beforeend', markUp);
        console.log('клик по Queue');
        console.log(refs.libWatchedBtn); 
        refs.libQueueBtn.classList.add('activeLibBtn');
        refs.libWatchedBtn.classList.remove('activeLibBtn');
               
      }

      openQueue()
      
      function openWatch() {
        refs.libListwWrap.innerHTML= "";
        const markUp = libPageTempl(parsedWatched);
        // refs.libListwWrap.innerHTML( markUp);
        refs.libListwWrap.insertAdjacentHTML('beforeend', markUp);
        console.log('клик по watched');
      }
     
    refs.homeRef.addEventListener('click', navigationPages.activeHomePage);
    refs.libraryPage.addEventListener('click', activeDetailsPage);
// refs.homeRef.addEventListener('click', navigationPages.createPopularMovieList);


// refs.libSection.addEventListener('click', event =>{
refs.libraryPage.addEventListener('click', event =>{
      if (event.target.classList.contains('lib_queue-link')) {        
        console.log('открыли список Queue!');
        openQueue()
        // добавляем класс с бекграундом на кнопку        
       
        // refs.libQueueBtn.style.backgroundColor = "#77c1bb";
        refs.libQueueBtn.classList.add('activeLibBtn');
        refs.libWatchedBtn.classList.remove('activeLibBtn');
        // event.target.classList.add('activeLibBtn');
        
      }
      if (event.target.classList.contains('lib_watched-link')) {        
        console.log(' открыли список watched');
        openWatch();
        refs.libQueueBtn.classList.remove('activeLibBtn');
        refs.libWatchedBtn.classList.add('activeLibBtn');
      
      }
  })
 
}






export default openLib;

