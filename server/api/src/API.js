import Fastify from 'fastify';

import es from './ElasticSearch.js';

const API = (opts = {}) => {
  const server = Fastify(opts);

  server.get('/', req =>
    ({ message: 'Hello World' }));

  server.get('/search', (req, res) => {
    const query = req.query.q; 
    const size = req.query.size || 10;

    if (!query) {
      return res
        .code(400)
        .header('Content-Type', 'application/json')
        .send({ error: 'Missing parameter: q' });
    } else {
      return es.search(query, size);
    }
  });

  server.get('/nn', req => {
    
  });

  return server;
}

export default API;