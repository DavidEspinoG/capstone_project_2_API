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
    (value) => {
      commentWrapper.innerHTML = '';
      const popImg = document.createElement('img');
      const popTitle = document.createElement('h2');
      const popOverview = document.createElement('p');
      const commnetListTitle = document.createElement('h3');
      const commentLists = document.createElement('ul');
      const commentList = document.createElement('li');
      const commentTitle = document.createElement('h3');
      const commnetForm = document.createElement('form');
      const userName = document.createElement('input');
      const commentText = document.createElement('textarea');
      const submitBtn = document.createElement('button');
      const exitBtn = document.createElement('button');

      const iamgeUrl = `${showImage}/${value.backdrop_path}`;
      popImg.setAttribute('src', iamgeUrl);
      popTitle.innerText = value.original_title;
      popOverview.innerText = value.overview;
      commnetListTitle.innerText = 'Comments';
      commentTitle.innerText = 'Add a comment';
      commnetForm.className = 'comment-form';
      userName.setAttribute('placeholder', 'Your Name');
      userName.setAttribute('type', 'text');
      commentText.setAttribute('placeholder', 'Comment');
      submitBtn.className = 'submit-comment';
      submitBtn.innerText = 'Comment';
      exitBtn.className = 'exit-btn';
      exitBtn.innerText = 'X';
      // delete this place holder
      const commentPlaceHolder = document.createElement('p');
      commentPlaceHolder.innerText = '03/15/2023 Alex: I\'d love to watch this movie';

      commnetForm.append(userName, commentText, submitBtn);
      commentWrapper.append(popImg, popTitle, popOverview, commnetListTitle, commentPlaceHolder,
        commentTitle, commnetForm, exitBtn);

      exitBtn.addEventListener('click', () => {
        commentWrapper.style.display = 'none';
      });
    },
  );
};



export default commentPopUp;