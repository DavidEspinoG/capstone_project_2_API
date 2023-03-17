import apiKey from './apiKey.js';
import envolvAPI from './involvementUrl.js';
import mainUrl from './mainUrl.js';

const commentWrapper = document.querySelector('.comment-container');
const showImage = 'http://image.tmdb.org/t/p/w500/';

const movieData = async (endpoint, movieId) => {
  const response = await fetch(`${mainUrl}${endpoint}/${movieId}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
};

const newComment = async (itemId, username, comment, callBack) => {
  let response;
  try {
    response = await fetch(`${envolvAPI}/comments`, {
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

    if (response.status === 201) {
      callBack(itemId);
    }

    return response.status;
  } catch (error) {
    return { error, response: response.status };
  }
};

const getComment = async (movieId) => {
  const response = await fetch(`${envolvAPI}/comments?item_id=${movieId}`);
  return response.json();
};

const commentPopUp = (endpoint, movieId) => {
  const overlay = document.getElementById('overlay');
  const moviesContainer = document.querySelector('.movies-container');
  moviesContainer.classList.add('active');
  overlay.classList.add('active');
  commentWrapper.classList.add('active');
  movieData(endpoint, movieId).then(
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
      const exitBtn = document.createElement('i');

      const iamgeUrl = `${showImage}/${value.backdrop_path}`;
      popImg.setAttribute('src', iamgeUrl);
      popTitle.innerText = 'title' in value ? value.title : value.name;
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
      exitBtn.className = 'las la-times';

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
        commentWrapper.classList.remove('active');
        moviesContainer.classList.remove('active');
        overlay.classList.remove('active');
      });
    },
  );
};

export default commentPopUp;