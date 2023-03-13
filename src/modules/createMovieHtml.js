const createMovieHtml = (obj) => {
  const container = document.createElement('div');
  const img = document.createElement('img');
  const titleDiv = document.createElement('div');
  const title = document.createElement('p');
  const likeButton = document.createElement('i');
  const commentButton = document.createElement('button');
  const reserveButton = document.createElement('button');
  title.innerText = obj.title;
  return container;
};
