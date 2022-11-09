import Fastify from 'fastify';

import Config from './Config.js';

import es from './elastic/index.js';
import qdrant from './qdrant/index.js';

import { knn, random, search } from './api/index.js';

const API = (opts = {}) => {
  const server = Fastify(opts);

  server.get('/search', search);
  server.get('/knn', knn);
  server.get('/random', random);

  // Helper proxy method to get around CORS and deep linking blocks
  server.get('/api/proxy', (req, res) => {
    const { url } = req.query;
    request.get(url).pipe(res);
  });

  return server;
}

const server = API();

const start = async () => {

  es.init();
  qdrant.init();

  try {
    server.listen({ port: Config.API_PORT, host: '0.0.0.0' });
    console.log(`Started server on port ${Config.API_PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();