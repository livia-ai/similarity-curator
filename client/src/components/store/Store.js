import { writable } from 'svelte/store';

/** Returns the K nearest neighbours to the given image from the backend **/
const getKNearest = (museum, id, k = 24) => {
  console.log('fetching', museum, id, k);
  return fetch(`http:/localhost:3000/knn?museum=${museum}&id=${id}&k=${k}`)
    .then(res => res.json())
    .then(data => {
      console.log('got response', data);
      return data.hits
    });
}

/** Fetches a random image from the backend **/
const getRandomRecord = () =>
  fetch('http:/localhost:3000/random')
    .then(res => res.json())
    .then(data => data.hits[0]);

const createStore = () => {

  const { subscribe, set } = writable([]);

  getRandomRecord()
    .then(record => getKNearest(record.museum, record.id))
    .then(records => {
      console.log('records');
      console.log(records);
    });

}

export const store = createStore();