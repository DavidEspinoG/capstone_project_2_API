const getReservations = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const postReservation = async (url, reservationData) => {
  const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(reservationData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
  });
  const data = await response.json();

  return data;
};

export { getReservations, postReservation };