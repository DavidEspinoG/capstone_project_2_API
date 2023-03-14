const movieCounter = (elements) => {
  const displayer = document.getElementById('total-movies');
  let counter = 0;
  elements.forEach(() => {
    counter += 1;
  });
  displayer.innerText = counter;
  return counter;
};

export default movieCounter;
