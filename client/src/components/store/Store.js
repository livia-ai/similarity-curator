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

const searchRecords = query =>
  fetch(`/api/search?q=${query}`)
    .then(res => res.json())
    .then(data => data.hits);

/** 
 * Sorts the array for display in the grid, 
 * so that the start of the array is in the middle.
 * 
 * TODO can we find a nice algorithmic solution to this?
 */
const gridSort = arr => ([
  arr[23],
  arr[21],
  arr[19],
  arr[17],
  arr[15],
  arr[13],
  arr[11],
  arr[9],
  arr[7],
  arr[5],
  arr[3],
  arr[1],
  arr[0],
  arr[2],
  arr[4],
  arr[6],
  arr[8],
  arr[10],
  arr[12],
  arr[14],
  arr[16],
  arr[18],
  arr[20],
  arr[22],
  arr[24]
]).filter(v => v);

const createStore = () => {

  const { subscribe, set } = writable([]);

  const setCenter = record => {
    return getKNearest(record.museum, record.id)
      .then(records => {
        set(gridSort([ record, ...records ]))
      });
  }

  const randomize = () =>
    getRandomRecord()
      .then(record =>
        getKNearest(record.museum, record.id)
          .then(records => {
            set(gridSort([ record, ...records ]))
    }));

  const search = query =>
    searchRecords(query).then(hits =>
      set(gridSort(hits)));

  if (window.location.hash) {
    search(window.location.hash.substring(1));
  } else {
    randomize();
  }

  return { randomize, search, setCenter, subscribe };

}

export const records = createStore();