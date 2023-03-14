import './style.scss';
import getTrending from './modules/getTrending.js';
import createMovieHtml from './modules/createMovieHtml.js';

const movieContainer = document.getElementById('movies-container');

getTrending()
  .then((data) => {
    data.forEach((element) => {
      movieContainer.append(createMovieHtml(element));
    });
  });
