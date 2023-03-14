import involvementUrl from './involvementUrl.js';
import { getReservations, postReservation } from './reservationsData.js';

const closePopup = () => {
  const container = document.querySelector('.reservation-container');
  container.classList.remove('active');
  container.innerHTML = '';

  return container;
};

const reservationDetails = (data) => {
  const container = document.querySelector('.reservation-container');
  container.classList.add('active');

  container.insertAdjacentHTML('beforeend',
    `<div class="img-container">
      <img src="https://image.tmdb.org/t/p/original/${data.backdrop_path}" alt="">
    </div>
    <i class="las la-times"></i>
    <section id="reservation-movie-meta">
      <h2>${data.title}</h2>
      <p>${data.overview}</p>
    </section>`);

  const closeBtn = document.querySelector('.las.la-times');

  closeBtn.addEventListener('click', closePopup);

  return container;
}

const reservationNumbers = (id) => {
  const url = `${involvementUrl}/reservations?item_id=${id}`;
  const container = document.querySelector('.reservation-container');
  container.insertAdjacentHTML('beforeend', `<section id="reservations-list"></section>`)

  const list = document.getElementById('reservations-list');
  list.innerHTML = '<h3>Reservations</h3>';

  getReservations(url).then((data) => {
    data.forEach((reservation) => {
      list.insertAdjacentHTML('beforeend', 
      `<p>${reservation.date_start} - ${reservation.date_end} by ${reservation.username}</p>`)
    });
  })

  return container;
}

const reserveMovie = ({id, name, start, end}) => {
  console.log({id, name, start, end});
  const url = `${involvementUrl}/reservations/`;
  const data = {
    item_id: id,
    username: name,
    date_start: start,
    date_end: end
  };
  postReservation(url, data);
}

const displayReservation = (movieData, id) => {
  const container = document.querySelector('.reservation-container');
  container.innerHTML = '';
  reservationDetails(movieData);
  reservationNumbers(id);

  container.insertAdjacentHTML('beforeend', 
  `<form action="/" data-id="${id}">
    <h3>Add a Reservation</h3>
    <input type="text" name="user-name" id="user-name" placeholder="Your name" required>
    <input type="date" name="res-start" id="res-start" placeholder="Start date" required>
    <input type="date" name="res-end" id="res-end" placeholder="End date" required>
    <button type="submit">Reserve</button>
  </form>`);

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      id: form.dataset.id,
      name: document.getElementById('user-name').value,
      start: document.getElementById('res-start').value,
      end: document.getElementById('res-end').value
    };
    reserveMovie(formData);

    document.getElementById('user-name').value = '';
    document.getElementById('res-start').value = '';
    document.getElementById('res-end').value = '';
  });
};

export default displayReservation;