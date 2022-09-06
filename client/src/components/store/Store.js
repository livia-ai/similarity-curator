import { writable } from 'svelte/store';

/** Returns the K nearest neighbours to the given image from the backend **/
const getKNearest = image =>
  fetch(`/api/knn`)
    .then(res => res.json())
    .then(data => {

    });

/** Fetches a random image from the backend **/
const getRandomImage = () =>
  fetch('/api/random')
    .then(res => res.json())
    .then(data => {

    });

const createStore = () => {

  const { subscribe, set } = writable([]);

}

export const store = createStore();