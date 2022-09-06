import { writable } from 'svelte/store';

/** Returns the K nearest neighbours to the given image from the backend **/
const getKNearest = (museum, id, k = 24) =>
  fetch(`/api/knn?museum=${museum}&id=${id}&k=${k}`)
    .then(res => res.json());

/** Fetches a random image from the backend **/
const getRandomRecord = () =>
  fetch('/api/random')
    .then(res => res.json())
    .then(data => data.hits[0]);

const createStore = () => {

  const { subscribe, set } = writable([]);

  // Initialize with random starting point
  getRandomRecord()
    .then(record =>
      getKNearest(record.museum, record.id)
        .then(records =>
          set([ record, ...records ])));

  return { subscribe };

}

export const records = createStore();