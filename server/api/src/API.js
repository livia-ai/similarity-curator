import Fastify from 'fastify';

const API = (opts = {}) => {
  const server = Fastify(opts);

  server.get('/', req =>
    ({ message: 'Hello World' }));

  return server;
}

export default API;