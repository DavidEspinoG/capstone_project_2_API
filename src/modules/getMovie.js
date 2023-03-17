import mainUrl from './mainUrl.js';
import apiKey from './apiKey.js';

const getMovie = async (endpoint, id) => {
  const response = await fetch(`${mainUrl}${endpoint}/${id}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
};

export default getMovie;