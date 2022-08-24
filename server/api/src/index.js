import API from './API';
import Config from './Config';
import es from './ElasticSearch';

const server = API();

const start = async () => {

  es.init();

  try {
    server.listen({ port: Config.API_PORT, host: '0.0.0.0' });
    console.log(`Started server on port ${Config.API_PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();