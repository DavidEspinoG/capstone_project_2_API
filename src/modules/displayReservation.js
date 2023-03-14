const closePopup = () => {
  const container = document.querySelector('.reservation-container');
  container.classList.remove('active');
  container.innerHTML = '';
};

const displayReservation = (dataObj) => {
  const container = document.querySelector('.reservation-container');
  container.classList.add('active');

  container.insertAdjacentHTML('beforeend',
    `<div class="img-container">
            <img src="https://image.tmdb.org/t/p/original/${dataObj.backdrop_path}" alt="">
        </div>
        <i class="las la-times"></i>
        <section id="reservation-movie-meta">
            <h2>${dataObj.title}</h2>
            <p>${dataObj.overview}</p>
        </section>
        <section id="reservation-info">
            <h3>Reservations (2)</h3>
            <p>03/11/2023 - 03/16/2023 by Alex</p>
            <p>03/18/2023 - 03/23/2023 by Mia</p>
        </section>
        <form action="">
            <h3>Add a Reservation</h3>
            <input type="text" name="user-name" id="user-name" placeholder="Your name">
            <input type="date" name="res-start" id="res-start" placeholder="Start date">
            <input type="date" name="res-end" id="res-end" placeholder="End date">
            <button type="submit">Reserve</button>
        </form>`);
  
  const closeBtn = document.querySelector('.las.la-times');

  closeBtn.addEventListener('click', closePopup);
};

export default displayReservation;