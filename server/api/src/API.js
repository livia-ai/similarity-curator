import Fastify from 'fastify';

import es from './ElasticSearch.js';
import qdrant from './Qdrant.js';

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

  server.get('/nn', (req, res) => {
    const { museum, id } = req.query;

    return (!museum || !id) ?
      res
        .code(400)
        .header('Content-Type', 'application/json')
        .send({ error: 'Missing parameter: `museum` and/or `id`' }) : 

      qdrant.getNearest(museum, id)
        .then(records => es.retrieve(records));
  });

  return server;
}

export default API;