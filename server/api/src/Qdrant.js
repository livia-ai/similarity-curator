import fs from 'fs';
import fetch from 'node-fetch';
import { Qdrant } from 'qdrant';

const DATA_URL = 'https://dl.dropboxusercontent.com/s/uvz12ze382yuqyb/mak-vectors.jsonl.gz';
const DATA_PATH = '../data/mak-vectors.jsonl.gz';

const client = new Qdrant('http://localhost:6333/');

const SCHEMA = {
  vector_size: 256,
  distance: 'Cosine'
};

const init = () => {
  console.log('[Qdrant] Checking if collections exists');

  return client.get_collection('livia').then(({ response }) => {
    if (response.result) {
      console.log('[Qdrant] Exists');
    } else {
      console.log('[Qdrant] No collection - creating new');
      return client.create_collection('livia', SCHEMA).then(() => {    
        if (!fs.existsSync(DATA_PATH))
          return download().then(() => ingest());
        else 
          return ingest();
      });
    }
  })
}

const download = async () => {
  console.log('[Qdrant] Downloading data - this may take a while');

  const response = await fetch(DATA_URL);
  const stream = fs.createWriteStream(DATA_PATH);

  return new Promise((resolve, reject) => {
    response.body.pipe(stream);
    response.body.on('error', reject);
    stream.on('finish', () => {
      console.log('[Qdrant] Download complete');
      resolve();
    });
  });
}

const ingest = async () => {
  console.log('[Qdrant] Preparing data for ingest');
}

export default {
  init
}