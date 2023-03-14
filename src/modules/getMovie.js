import mainUrl from './mainUrl.js';
import apiKey from './apiKey.js';

const getMovie = async (id) => {
  const response = await fetch(`${mainUrl}movie/${id}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
};

export default getMovie;