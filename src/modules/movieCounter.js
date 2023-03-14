const movieCounter = async () => {
  const elements = document.querySelectorAll('.movie-card');
  const displayer = document.getElementById('total-movies');
  let counter = 0;
  elements.forEach(() => {
    counter += 1;
  })
  displayer.innerText = counter;
  return counter;
};

export default movieCounter;
