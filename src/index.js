import './style.scss';
import './images/TrendingApp.png';
import getTrending from './modules/getTrending.js';
import createMovieHtml from './modules/createMovieHtml.js';
import movieCounter from './modules/movieCounter.js';

const movieContainer = document.getElementById('movies-container');
const getMoviesBtn = document.getElementById('getMovies');
const getSeriesBtn = document.getElementById('getSeries');
const getPeopleBtn = document.getElementById('getPeople');

getTrending('movie')
  .then((data) => {
    data.forEach((element) => {
      movieContainer.append(createMovieHtml('movie', element));
    });
    const movies = document.querySelectorAll('.movie-card');
    movieCounter(movies);
  });

getMoviesBtn.addEventListener('click', () => {
  movieContainer.innerHTML = '';
  getTrending('movie')
    .then((data) => {
      data.forEach((element) => {
        movieContainer.append(createMovieHtml('movie', element));
      });
      const movies = document.querySelectorAll('.movie-card');
      movieCounter(movies);
    });
});

getSeriesBtn.addEventListener('click', () => {
  movieContainer.innerHTML = '';
  getTrending('tv')
    .then((data) => {
      data.forEach((element) => {
        movieContainer.append(createMovieHtml('tv', element));
      });
      const movies = document.querySelectorAll('.movie-card');
      movieCounter(movies);
    });
});

getPeopleBtn.addEventListener('click', () => {
  movieContainer.innerHTML = '';
  getTrending('person')
    .then((data) => {
      data.forEach((element) => {
        movieContainer.append(createMovieHtml('person', element));
      });
      const movies = document.querySelectorAll('.movie-card');
      movieCounter(movies);
    });
});
