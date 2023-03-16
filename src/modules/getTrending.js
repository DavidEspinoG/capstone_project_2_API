import apiKey from './apiKey.js';
import mainUrl from './mainUrl.js';

const getTrending = async () => {
  const res = await fetch(`${mainUrl}trending/movie/day?api_key=${apiKey}`);
  const data = await res.json();
  return data.results;
};

export default getTrending;