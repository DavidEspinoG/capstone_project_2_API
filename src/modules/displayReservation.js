import involvementUrl from './involvementUrl.js';
import { getReservations, postReservation } from './reservationsData.js';
import reservationsCounter from './reservationsCounter.js';

const closePopup = () => {
  const body = document.querySelector('body');
  const container = document.querySelector('.reservation-container');
  const overlay = document.getElementById('overlay');
  const moviesContainer = document.querySelector('.movies-container');
  moviesContainer.classList.remove('active');
  container.classList.remove('active');
  overlay.classList.remove('active');
  body.classList.remove('popup');
  container.innerHTML = '';

  return container;
};

const reservationDetails = (data) => {
  const body = document.querySelector('body');
  const container = document.querySelector('.reservation-container');
  const overlay = document.getElementById('overlay');
  const moviesContainer = document.querySelector('.movies-container');
  moviesContainer.classList.add('active');
  container.classList.add('active');
  overlay.classList.add('active');
  body.classList.add('popup');

  container.insertAdjacentHTML('beforeend',
    `<div class="img-container">
      <img src="https://image.tmdb.org/t/p/original/${'backdrop_path' in data ? data.backdrop_path : data.profile_path}" alt="">
    </div>
    <i class="las la-times"></i>
    <section id="reservation-movie-meta">
      <h2>${'title' in data ? data.title : data.name}</h2>
      <p>${'overview' in data ? data.overview : data.biography}</p>
    </section>`);

  const closeBtn = document.querySelectorAll('.las.la-times');

  closeBtn.forEach((btn) => { btn.addEventListener('click', closePopup); });

  return container;
};

const reservationNumbers = (id) => {
  const url = `${involvementUrl}/reservations?item_id=${id}`;
  const container = document.querySelector('.reservation-container');
  container.insertAdjacentHTML('beforeend',
    `<section id="reservations-list-container">
      <h3>Reservations</h3>
      <ul id="reservations-list"></ul>
    </section>`);

  const list = document.getElementById('reservations-list');
  const h3 = document.querySelector('#reservations-list-container > h3');
  list.innerHTML = '';
  getReservations(url).then((data) => {
    data.forEach((reservation) => {
      list.insertAdjacentHTML('beforeend',
        `<li>${reservation.date_start} - ${reservation.date_end} by ${reservation.username}</li>`);
    });
    const listArr = document.querySelectorAll('#reservations-list > li');
    h3.innerHTML = `Reservations (${reservationsCounter(listArr)})`;
  }).catch(() => {
    list.insertAdjacentHTML('beforeend',
      '<p>There are no reservations yet</p>');
  });

  return container;
};

const reserveMovie = ({
  id, name, start, end,
}) => {
  const url = `${involvementUrl}/reservations/`;
  const data = {
    item_id: id,
    username: name,
    date_start: start,
    date_end: end,
  };
  postReservation(url, data).then(() => {
    reservationNumbers(id);
  });
};

const displayReservation = (movieData, id, person = false) => {
  const container = document.querySelector('.reservation-container');
  container.innerHTML = '';
  reservationDetails(movieData);
  if(!person) {
    reservationNumbers(id);
    container.insertAdjacentHTML('beforeend',
    `<form action="/" data-id="${id}">
    <h3>Add a Reservation</h3>
    <input type="text" name="user-name" id="user-name" placeholder="Your name" required>
    <input type="date" name="res-start" id="res-start" placeholder="Start date" required>
    <input type="date" name="res-end" id="res-end" placeholder="End date" required>
    <button type="submit">Reserve</button>
    </form>`);
  }
  

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      id: form.dataset.id,
      name: document.getElementById('user-name').value,
      start: document.getElementById('res-start').value,
      end: document.getElementById('res-end').value,
    };
    reserveMovie(formData);

    document.getElementById('user-name').value = '';
    document.getElementById('res-start').value = '';
    document.getElementById('res-end').value = '';
  });
};

export default displayReservation;