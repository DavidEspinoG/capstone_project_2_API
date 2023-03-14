import getMovie from './getMovie.js';
import displayReservation from './displayReservation.js';

const createMovieHtml = (obj) => {
  const container = document.createElement('div');
  const img = document.createElement('img');
  const title = document.createElement('p');
  const likeButton = document.createElement('i');
  const likes = document.createElement('span');
  const commentButton = document.createElement('button');
  const reserveButton = document.createElement('button');
  container.classList.add('movie-card');
  title.innerText = obj.title;
  likes.innerText = '1';
  commentButton.innerText = 'Comment';
  commentButton.classList.add('button');
  commentButton.dataset.id = obj.id;
  reserveButton.innerText = 'Reserve';
  reserveButton.classList.add('button');
  reserveButton.dataset.id = obj.id;

  reserveButton.addEventListener('click', () => {
    getMovie(obj.id).then((data) => displayReservation(data));
  });

  likeButton.classList.add('lar');
  likeButton.classList.add('la-heart');
  likeButton.classList.add('like-button');
  img.src = `https://image.tmdb.org/t/p/w500/${obj.poster_path}`;
  container.append(img, title, likeButton, commentButton, reserveButton);
  return container;
};

export default createMovieHtml;