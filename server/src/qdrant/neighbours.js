import fetch from 'node-fetch';
import Config from '../Config.js';

const shuffle = array => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const getNeighbours = (museum, id, k = 10, stretch = 1) => {
  // Step 1. fetch record (museum/id)
  const query = {
    filter: {
      must: [
        { key: 'museum', match: { value: museum } },
        { key: 'id', match: { value: id } }
      ]
    },
    with_vector: true
  };

  return fetch(`http://${Config.HOSTS.QDRANT}:6333/collections/livia/points/scroll`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  })
  .then(res => res.json())
  .then(data => {
    const { points } = data.result;

    if (points.length === 0)
      throw new Error(`Not found: ${museum}, ${id}`);

    // Step 2. get item vector and search k nearest neighbours
    const { vector } = points[0];

    return fetch(`http://${Config.HOSTS.QDRANT}:6333/collections/livia/points/search`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        vector,
        limit: (stretch * k) + 1, // Response *may* include the item itself, which we'll filter
        with_payload: true
      })
    })
    .then(res => res.json())
    .then(data => { 
      const neighbours = data.result
        .map(r => r.payload)
        // Filter original item
        .filter(r => r.id !== id);

      return shuffle(neighbours).slice(0, k);
    });
  });
}

export default getNeighbours;
