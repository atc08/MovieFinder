import detailsPageTpl from '../templates/detailsPage.hbs';
import fetchMovieByID from './fetchMovieByID';
import refs from './refs';
import { notice } from './notification';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

let movieId;
const selectedMovie = {};

function selectMovie(event) {
    selectedMovie.id = event.target.dataset.id;
    selectedMovie.imgPath = event.target.src;
    selectedMovie.title = event.target.alt;
    selectedMovie.year = event.target.dataset.date.split('-')[0];
    selectedMovie.vote = event.target.dataset.vote;
};

function showDetails(selectedMovie) {
    fetchMovieByID(selectedMovie.id)
    .then((film) => {
        refs.detailsPage.insertAdjacentHTML('beforeend', detailsPageTpl(film));
        monitorButtonStatusText();
    })
}

const activeDetailsPage = (event) => {
    if (event.target.nodeName !== 'IMG') { return }
    refs.detailsPage.innerHTML = '';
    refs.searchForm.classList.add('is-hidden');
    refs.homePage.classList.add('is-hidden');
    refs.libraryPage.classList.add('is-hidden');
    movieId = event.target.dataset.id;

    selectMovie(event);

    showDetails(selectedMovie);
    refs.detailsPage.addEventListener('click', onclick);
};

function monitorButtonStatusText() {
    filmsWatched = JSON.parse(localStorage.getItem('filmsWatched'));
    let addToWatchedBtn = document.querySelector('.addToWatchedBtn');
    if (filmsWatched.find(film => film.id === selectedMovie.id)) {
        addToWatchedBtn.textContent = 'Delete from Watched';
    } else {
        addToWatchedBtn.textContent = 'Add to Watched';
    };
    filmsQueue = JSON.parse(localStorage.getItem('filmsQueue'));
    let addToQueueBtn = document.querySelector('.addToQueueBtn');
    if (filmsQueue.find(film => film.id === selectedMovie.id)) {
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
        `<img src=${event.target.src} width="800" height="600">`);
        instance.show();
    };
    if (event.target.classList.contains('addToWatchedBtn')) {
        filmsWatched = JSON.parse(localStorage.getItem('filmsWatched'));
        
        if (filmsWatched.find(film => film.id === selectedMovie.id)) {
            notice({
                text: 'Movie deleted from Watched',
                delay: 1500,
            });
            filmsWatched = filmsWatched.filter(film => film.id !== selectedMovie.id);
            let addToWatchedBtn = document.querySelector('.addToWatchedBtn');
            addToWatchedBtn.textContent = 'Add to Watched';
        } else {
            notice({
                text: 'Movie added to Watched',
                delay: 1500,
            });
        filmsWatched.push({...selectedMovie});
        }
        localStorage.setItem('filmsWatched', JSON.stringify(filmsWatched));
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
            filmsQueue = filmsQueue.filter(film => film.id !== selectedMovie.id);
            let addToQueueBtn = document.querySelector('.addToQueueBtn');
            addToQueueBtn.textContent = 'Add to Queue';
        } else {
            notice({
                text: 'Movie added to Queue',
                delay: 1500,
            });
            filmsQueue.push({...selectedMovie});
        }
        localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
        let addToQueueBtn = document.querySelector('.addToQueueBtn');
        addToQueueBtn.textContent = 'Delete from Queue';
    }
}
export default activeDetailsPage;


