import { writable } from 'svelte/store';

const createMyCollection = () => {

  const { subscribe, update } = writable([]);

  const add = record => update(records => ([...records, record]));

  const remove = record => update(records => records.filter(r => {
    const toRemove = r.id === record.id && r.museum === record.museum;
    return !toRemove;
  }));

  return {
    subscribe,
    add,
    remove
  }

}

export const collection = createMyCollection(); 