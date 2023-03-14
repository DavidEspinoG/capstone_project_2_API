import './style.scss';
import getTrending from './modules/getTrending.js';
import createMovieHtml from './modules/createMovieHtml.js';
import movieCounter from './modules/movieCounter.js';

const movieContainer = document.getElementById('movies-container');

getTrending()
  .then((data) => {
    data.forEach((element) => {
      movieContainer.append(createMovieHtml(element));
    });
    const movies = document.querySelectorAll('.movie-card');
    movieCounter(movies);
  });
