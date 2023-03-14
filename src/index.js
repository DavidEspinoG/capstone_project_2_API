import './style.scss';
import getMovie from  './modules/getMovie.js';
const movie = document.querySelector('.reservation-movie');

movie.addEventListener('click', () => {
    console.log('click')
    getMovie(157336);
});