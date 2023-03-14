import './style.scss';
import getMovie from './modules/getMovie.js';
import displayReservation from './modules/displayReservation.js';

const movie = document.querySelector('footer > p');

movie.addEventListener('click', () => {
  getMovie(157336).then((data) => displayReservation(data));
});