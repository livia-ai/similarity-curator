import Fastify from 'fastify';

import es from './elastic/index.js';
import qdrant from './qdrant/index.js';

const API = (opts = {}) => {
  const server = Fastify(opts);

  server.get('/search', (req, res) => {
    const query = req.query.q; 
    const size = req.query.size || 10;

    return (!query) ?
      res
        .code(400)
        .header('Content-Type', 'application/json')
        .send({ error: 'Missing parameter: `q`' })  :
    
      es.search(query, size);
  });

  server.get('/knn', (req, res) => {
    const { museum, id } = req.query;

    const k = req.query.k ? parseInt(req.query.k) : 10;

    return (!museum || !id) ?
      res
        .code(400)
        .header('Content-Type', 'application/json')
        .send({ error: 'Missing parameter: `museum` and/or `id`' }) : 

      qdrant.getNearest(museum, id, k)
        .then(records => es.retrieve(records));
  });

  server.get('/random', () => es.getRandom());

  return server;
}

export default API;