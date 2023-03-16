import involvementUrl from './involvementUrl.js';

const likeMovie = async (id) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
    }),
  };
  const res = await fetch(`${involvementUrl}/likes`, config);
  return res.ok;
};

export default likeMovie;