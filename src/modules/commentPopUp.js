import apiKey from '../apiKey.js';
import '../comment.scss';

const commentWrapper = document.querySelector('.comment-container');
const endPoint = 'https://api.themoviedb.org/3/movie/';
const showImage = 'http://image.tmdb.org/t/p/w500/';
const appId = 'XXyTDvZv9uOyCyOJ39gw';
const envolvAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

const movieData = async (movieId) => {
  const response = await fetch(`${endPoint}/${movieId}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
};

const newComment = async (itemId, username, comment, callBack) => {
  let response;
  try {
    response = await fetch(`${envolvAPI}/${appId}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        item_id: itemId,
        username,
        comment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  } catch (error) {
    console.log(error, response.status);
  }

  if (response.status === 201) {
    callBack(itemId);
    console.log('Post successful');
  } else {
    console.log('Post failed');
  }
};

const getComment = async (movieId) => {
  const response = await fetch(`${envolvAPI}/${appId}/comments?item_id=${movieId}`);
  return response.json();
};

const commentPopUp = (movieId) => {
  commentWrapper.style.display = 'flex';
  movieData(movieId).then(
    (value) => {
      commentWrapper.innerHTML = '';
      const popImg = document.createElement('img');
      const popTitle = document.createElement('h2');
      const popOverview = document.createElement('p');
      const commnetListTitle = document.createElement('h3');
      const commentLists = document.createElement('ul');
      commentLists.className = 'comment-list';
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
      commentTitle.innerText = 'Add a comment';
      commnetForm.className = 'comment-form';
      userName.setAttribute('placeholder', 'Your Name');
      userName.setAttribute('type', 'text');
      userName.required = true;
      commentText.setAttribute('placeholder', 'Comment');
      commentText.required = true;
      submitBtn.className = 'submit-comment';
      submitBtn.innerText = 'Comment';
      exitBtn.className = 'exit-btn';
      exitBtn.innerText = 'X';
      // delete this place holder
      // const commentPlaceHolder = document.createElement('p');
      // commentPlaceHolder.innerText = '03/15/2023 Alex: I\'d love to watch this movie';

      getComment(movieId).then(
        (value) => {
          const commentLength = value.length ? value.length : 0;
          commnetListTitle.innerText = `Comments (${commentLength})`;
          for (let i = 0; i < value.length; i += 1) {
            const listItem = document.createElement('li');
            listItem.innerText = `${value[i].creation_date} ${value[i].username}: ${value[i].comment}`;
            commentLists.appendChild(listItem);
          }
        },
      );

      commnetForm.append(userName, commentText, submitBtn);
      commentWrapper.append(popImg, popTitle, popOverview, commnetListTitle, commentLists,
        commentTitle, commnetForm, exitBtn);

      commnetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        newComment(movieId, userName.value, commentText.value, commentPopUp);
        userName.value = '';
        commentText.value = '';
      });

      exitBtn.addEventListener('click', () => {
        commentWrapper.style.display = 'none';
      });
    },
  );
};

export default commentPopUp;