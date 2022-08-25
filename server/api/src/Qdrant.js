import { Qdrant } from 'qdrant';

const client = new Qdrant('http://localhost:6333/');

const SCHEMA = {
  vector_size: 256,
  distance: 'Cosine'
};

const init = () => {
  console.log('[Qdrant] Checking if collections exists');

  client.get_collection('livia').then(({ response }) => {
    if (response.result) {
      console.log('[Qdrant] Exists');
    } else {
      console.log('[Qdrant] No collection - creating new');
      client.create_collection('livia', SCHEMA).then(res => {
        console.log('[Qdrant] Preparing data for ingest');
      });
    }
  })
}

export default {
  init
}