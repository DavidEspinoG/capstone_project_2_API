const createMovieHtml = (obj) => {
  const container = document.createElement('div');
  const img = document.createElement('img');
  const title = document.createElement('p');
  const likeButton = document.createElement('i');
  const commentButton = document.createElement('button');
  const reserveButton = document.createElement('button');
  title.innerText = obj.title;
  commentButton.innerText = 'Comment';
  reserveButton.innerText = 'Reserve';
  likeButton.classList.add('lar');
  likeButton.classList.add('la-heart');

  container.append(img, title, likeButton, commentButton, reserveButton);
  return container;
};
