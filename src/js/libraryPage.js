
import libPageTempl from '../templates/libPage.hbs';
import refs from './refs';
import navigationPages from './navigation';
import activeDetailsPage from './filmDetailsPage';

function openLib() {
  navigationPages.activeLibraryPage();
  const parsedWatched = JSON.parse(localStorage.getItem('filmsWatched'));
  const parsedQueue = JSON.parse(localStorage.getItem('filmsQueue'));

  function openQueue() {
    refs.libListwWrap.innerHTML ="";
    const markUp = libPageTempl(parsedQueue);
    refs.libListwWrap.insertAdjacentHTML('beforeend', markUp);
    refs.libQueueBtn.classList.add('activeLibBtn');
    refs.libWatchedBtn.classList.remove('activeLibBtn');          
  }

  openQueue();
      
  function openWatch() {
    refs.libListwWrap.innerHTML= "";
    const markUp = libPageTempl(parsedWatched);
    refs.libListwWrap.insertAdjacentHTML('beforeend', markUp);
  }
     
  refs.homeRef.addEventListener('click', navigationPages.activeHomePage);
  refs.libraryPage.addEventListener('click', activeDetailsPage);

  refs.libraryPage.addEventListener('click', event => {
    if (event.target.classList.contains('lib_queue-link')) {        
      openQueue();
      refs.libQueueBtn.classList.add('activeLibBtn');
      refs.libWatchedBtn.classList.remove('activeLibBtn');
    }
    if (event.target.classList.contains('lib_watched-link')) {        
      openWatch();
      refs.libQueueBtn.classList.remove('activeLibBtn');
      refs.libWatchedBtn.classList.add('activeLibBtn'); 
    }
  }) 
}

export default openLib;