import involvementUrl from './involvmentUrl.js';

const getLikes = async (id) => {
  const res = await fetch(`${involvementUrl}/likes`);
  const data = await res.json();
  const index = data.findIndex((element) => element.item_id === id);
  if (index > -1) {
    return data[index].likes;
  }
  return 0;
};

export default getLikes;