import API from './API.js';
import Config from './Config.js';

import es from './ElasticSearch.js';
import qdrant from './Qdrant.js';

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