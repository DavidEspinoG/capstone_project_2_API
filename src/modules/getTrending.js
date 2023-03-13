import apiKey from "../apiKey.js";
import mainUrl from "./mainUrl";

const getTrending = async () => {
  const res = await fetch(`${mainUrl}trending/movie/day?api_key=${apiKey}`);
  const data = await res.json();
  console.log(data.results);
  return data.results;
};

export default getTrending;