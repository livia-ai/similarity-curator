import db from '../rethink/index.js';

export const createCollection = (req, res) =>
  db.storeCollection(req.body)
    .then(() => ({ response: 'ok' }))
    .catch(() => 
      res.code(500)
         .header('Content-Type', 'application/json')
         .send({ error: 'Internal server error' }));

export const getCollection = (req, res) => {
  const { id } = req.params;

  return db.getCollection(id).then(collection => {
    if (collection)
      return collection;
    else
      res.code(404)
         .header('Content-Type', 'application/json')
         .send({ message: 'Not found' });
  });
}