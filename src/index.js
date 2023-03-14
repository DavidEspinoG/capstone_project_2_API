import './style.scss';
import getTrending from './modules/getTrending.js';
import createMovieHtml from './modules/createMovieHtml.js';
import getMovie from './modules/getMovie.js';
import displayReservation from './modules/displayReservation.js';

const movie = document.querySelector('footer > p');
const movieContainer = document.getElementById('movies-container');

getTrending()
  .then((data) => {
    data.forEach((element) => {
      movieContainer.append(createMovieHtml(element));
    });
  });

movie.addEventListener('click', () => {
  getMovie(157336).then((data) => displayReservation(data));
});
