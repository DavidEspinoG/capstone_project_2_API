import apiKey from './apiKey.js';
import mainUrl from './mainUrl.js';

const getTrending = async (endpoint) => {
  const res = await fetch(`${mainUrl}trending/${endpoint}/day?api_key=${apiKey}`);
  const data = await res.json();
  return data.results;
};

export default getTrending;