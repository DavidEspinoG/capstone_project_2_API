import commentPopUp from './commentPopUp.js';
import getLikes from './getLikes.js';
import likeMovie from './likeMovie.js';
import getMovie from './getMovie.js';
import displayReservation from './displayReservation.js';

const createMovieHtml = (endpoint, obj) => {
  const container = document.createElement('div');
  const img = document.createElement('img');
  const title = document.createElement('p');
  const likeButton = document.createElement('i');
  const likes = document.createElement('span');
  const commentButton = document.createElement('button');
  const reserveButton = document.createElement('button');
  const likesDiv = document.createElement('div');
  likesDiv.classList.add('likes-div');
  likes.id = obj.id;
  likes.classList.add('like-counter');
  getLikes(obj.id)
    .then((data) => { likes.innerText = data; });
  container.classList.add('movie-card');
  title.innerText = endpoint === 'movie' ? obj.title : obj.name;
  commentButton.innerText = 'Comment';
  commentButton.classList.add('button');
  commentButton.classList.add('comment-button');
  commentButton.dataset.id = obj.id;
  reserveButton.innerText = 'Reserve';
  reserveButton.classList.add('button');
  reserveButton.dataset.id = obj.id;

  reserveButton.addEventListener('click', () => {
    getMovie(endpoint, obj.id).then((data) => displayReservation(data, obj.id));
  });

  likeButton.classList.add('lar');
  likeButton.classList.add('la-heart');
  likeButton.classList.add('like-button');

  commentButton.addEventListener('click', () => commentPopUp(endpoint, obj.id));

  likeButton.addEventListener('click', () => {
    likeMovie(obj.id)
      .then(() => {
        getLikes(obj.id)
          .then((data) => {
            likes.innerText = data;
          });
      });
  });
  img.src = `https://image.tmdb.org/t/p/w500/${endpoint === 'person' ? obj.profile_path : obj.poster_path}`;
  likesDiv.append(likeButton, likes);
  container.append(img, title, likesDiv, commentButton, reserveButton);
  return container;
};

export default createMovieHtml;