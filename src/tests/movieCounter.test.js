import movieCounter from '../modules/movieCounter.js';

test('movieCounter with 1 element', () => {
  document.body.innerHTML = `
  <div class="movie-card"></div>
  <span id="total-movies"></span>
  `;
  const movies = document.querySelectorAll('.movie-card');
  expect(movieCounter(movies)).toBe(1);
});
test('movieCounter with 2 element', () => {
  document.body.innerHTML = `
  <div class="movie-card"></div>
  <div class="movie-card"></div>
  <span id="total-movies"></span>
  `;
  const movies = document.querySelectorAll('.movie-card');
  expect(movieCounter(movies)).toBe(2);
});