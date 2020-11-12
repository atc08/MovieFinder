import { updateDetailsPageMarkUp } from './templating';
import detailsPageTpl from '../templates/detailsPage.hbs';
import fetchMovieByID from './fetchMovieByID';
import refs from './refs';
import { notice } from './notification';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
// import { selectedMovie } from './navigation'
let movieId;
const selectedMovie = {};

function selectMovie(event) {
    selectedMovie.id = event.target.dataset.id;
    selectedMovie.imgPath = event.target.src;
    selectedMovie.title = event.target.alt;
    selectedMovie.year = event.target.dataset.date.split('-')[0];
    selectedMovie.vote = event.target.dataset.vote;
    console.log('Selected movie:', selectedMovie);
};
//- пишем функцию showDetails которая принимает параметром selectedMovie
//  (глобальная переменная - объект, которая создана в задаче номер 3)
//  и рендерит всю разметку согласно макета, 
//  в этой функции запускается функция monitorButtonStatusText.
function showDetails(selectedMovie) {
//   const markUp = detailsPageTpl(result); 
fetchMovieByID(selectedMovie.id)
.then((film) => {
    refs.detailsPage.insertAdjacentHTML('beforeend', detailsPageTpl(film));
    monitorButtonStatusText();
})
}
// - создаем функцию activeDetailsPage которая показывает страницу 
// детальной отрисовки фильма и прячет остальные, функция принимает 
// два параметра movieId и itsLibraryFilm (это bool), и в зависимости 
// от того это выбранный фильм с домашней страницы или из библиотеки, 
//заполняет глобальную переменную selectFilm нужным объектом и запускает
// функцию  showDetails c параметром selectFilm который они заполнили
//   одними или другими данными (которую сделает 4й участник), 
//   вешает слушателей на кнопки добавления/удаления фильмов в очередь 
//   просмотра и добавления/удаления фильмов из просмотренных со страницы
//    detailsPage и удаляет ненужных всех слушателей 
//    (таких 4 во всем проекте не нужных на этой странице); 
const activeDetailsPage = (event) => {
    if (event.target.nodeName !== 'IMG') { return }
    refs.detailsPage.innerHTML = '';
    refs.searchForm.classList.add('is-hidden');
    refs.homePage.classList.add('is-hidden');
    refs.libraryPage.classList.add('is-hidden');
    movieId = event.target.dataset.id;

    selectMovie(event);

    showDetails(selectedMovie); // fetchMovieByID(movieId).then(updateDetailsPageMarkUp);
    refs.detailsPage.addEventListener('click', onclick);

    // monitorButtonStatusText()
};
//- пишем функцию monitorButtonStatusText которая следит за состоянием 
// (значок и текст в кнопке) читает  local storage по ключу filmsQueue
//  и  filmsWatched и меняет текст и значки в кнопках: 
// Delete from queue / Add to queue 
// ; Delete from watched / Add to watched.
function monitorButtonStatusText() {
    filmsWatched = JSON.parse(localStorage.getItem('filmsWatched'));
    let addToWatchedBtn = document.querySelector('.addToWatchedBtn');
    if (filmsWatched.find(film => film.id === selectedMovie.id)) {
        console.log('it`s in lib already');
        addToWatchedBtn.textContent = 'Delete from Watched';
    } else {
        addToWatchedBtn.textContent = 'Add to Watched';
        }
    filmsQueue = JSON.parse(localStorage.getItem('filmsQueue'));
    let addToQueueBtn = document.querySelector('.addToQueueBtn');
    if (filmsQueue.find(film => film.id === selectedMovie.id)) {
        console.log('it`s in lib already');
        addToQueueBtn.textContent = 'Delete from Queue';
    } else {
        addToQueueBtn.textContent = 'Add to Queue';
        }
    }

let filmsWatched = [];
let filmsQueue = [];

function onclick(event) {
    if (event.target.classList.contains('film-poster')) {
        const instance = basicLightbox.create(
        `<img src=${event.target.src} width="800" height="600">`,
        );
        instance.show();
    };
    if (event.target.classList.contains('addToWatchedBtn')) {
        filmsWatched = JSON.parse(localStorage.getItem('filmsWatched'));
        
        if (filmsWatched.find(film => film.id === selectedMovie.id)) {
        notice({
        text: 'Movie deleted from Watched',
        delay: 1500,
        });
console.log('it`s in lib already');
        filmsWatched = filmsWatched.filter(film => film.id !== selectedMovie.id);
        let addToWatchedBtn = document.querySelector('.addToWatchedBtn');
        addToWatchedBtn.textContent = 'Add to Watched';
        // monitorButtonStatusText();
        } else {
        notice({
        text: 'Movie added to Watched',
        delay: 1500,
        });
        console.log('Додаємо в переглянуті!');
        filmsWatched.push({...selectedMovie});
    }
        localStorage.setItem('filmsWatched', JSON.stringify(filmsWatched));
        console.log('Готовий масив для шаблонізатора:', filmsWatched);
        let addToWatchedBtn = document.querySelector('.addToWatchedBtn');
        addToWatchedBtn.textContent = 'Delete from Watched';
}
    if (event.target.classList.contains('addToQueueBtn')) {
        filmsQueue = JSON.parse(localStorage.getItem('filmsQueue'));

        if (filmsQueue.find(film => film.id === selectedMovie.id)) {
        notice({
        text: 'Movie deleted from Queue',
        delay: 1500,
        });
console.log('it`s in lib already');
        filmsQueue = filmsQueue.filter(film => film.id !== selectedMovie.id);
        let addToQueueBtn = document.querySelector('.addToQueueBtn');
        addToQueueBtn.textContent = 'Add to Queue';
        // monitorButtonStatusText();
        } else {
        notice({
        text: 'Movie added to Queue',
        delay: 1500,
        });
        console.log('Цей фільм подивимось на вихідних ;)');
        filmsQueue.push({...selectedMovie});
    }
        localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
        console.log('Готовий масив для шаблонізатора:', filmsQueue);
        let addToQueueBtn = document.querySelector('.addToQueueBtn');
        addToQueueBtn.textContent = 'Delete from Queue';
}
}
export default activeDetailsPage;

//- пишем функцию toggleToQueue (будет добавлять или удалять фильмы 
function toggleToQueue() {
// из очереди просмотра), которая создает переменную массива в очереди,
//  читает local storage по ключу filmsQueue если результат не пустой
//  то пушит элементы в нашу переменную, 
filmsQueue = JSON.parse(localStorage.getItem('filmsQueue'));
// ! также функция вплотную работает с глобальной переменной selectFilm,
//  и если selectFilm содержиться в нашей переменной то убираем его 
if (filmsQueue.includes(selectedMovie)) {
    console.log('delete');
} else {
    filmsQueue.push({...selectedMovie});
}
// оттуда иначе добавляем selectFilm в нашу переменную, 
// потом эта функция кладет нашу переменную в  local storage, 
localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
// запускает в конце себя функцию monitorButtonStatusText;
// monitorButtonStatusText()
}
//- пишем функцию toggleToWatched (будет добавлять или удалять фильмы 
// из просмотренных), суть ее работы один в один как toggleToQueue
//   только работает с local storage по ключу filmsWatched.

// function showDetails(selectFilm) {
    // }
// * из DOM достукивается до нужных кнопок участник 3 и вешает функции  toggleToQueue  и toggleToWatched слушателями на страницу деталей и удаляет там где не нужно.


 // selectedMovie.imgPath = obj.poster_path;
        // selectedMovie.title = obj.title;
        // selectedMovie.id = obj.id;
        // selectedMovie.vote = obj.vote_average;
        // selectedMovie.year = obj.release_date.split('-')[0];
    // console.log('Selected movie:', selectedMovie);

    
// export 
// function activeDetailsPage(event, movieId, itsLibraryFilm) {
//     console.log('selectFilm', selectFilm);
//     if (event.target.nodeName !== 'IMG') { return }
//     refs.searchForm.classList.add('is-hidden');
//     refs.homePage.classList.add('is-hidden');
//     refs.detailsPage.classList.remove('is-hidden');
//     refs.libraryPage.innerHTML = '';
//     refs.detailsPage.innerHTML = '';
//     refs.moviesContainer.innerHTML = '';
//     refs.popularPage.innerHTML = '';
//     refs.btnContainer.classList.add('is-hidden');
    
//     movieId = event.target.dataset.id;  
//     console.log('selectFilm.id', selectFilm.id);
//     // if (itsLibraryFilm) {
//         if (true) {
//             selectFilm.id = movieId;
//             selectFilm.library = true
//     };
//         console.log(selectFilm);
//     fetchMovieByID(movieId).then(showDetails)
//     .catch(fuckup => console.log(fuckup));
// };

