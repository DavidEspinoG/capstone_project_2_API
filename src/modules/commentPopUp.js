import apiKey from '../apiKey.js';
import '../comment.css';

const commentWrapper = document.querySelector('.comment-container');
const endPoint = 'https://api.themoviedb.org/3/movie/';
const showImage = 'http://image.tmdb.org/t/p/w500/';

const movieData = async (movieId) => {
  const response = await fetch(`${endPoint}/${movieId}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
};

const commentPopUp = (movieId) => {
  movieData(movieId).then(
    (value) => { commentWrapper.innerHTML = `
      <img src=${showImage}/${value.poster_path}>
      <h2>${value.original_title}</h2>
      <p>${value.overview}</p>
      <h3>Add a comment</h3>
      <input type="text" placeholder="Your name">
      <textarea placeholder="Your insights"></textarea>
      <button>Comment</button>
      <button class="exit" onclick="closePopUp()">X</button>
      `;
    },
  );
};

function closePopUp() {
  commentWrapper.style.display = 'none';
}
export default commentPopUp;