import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';
import LineByLineReader from 'line-by-line';
import zlib from 'zlib';
import { Qdrant } from 'qdrant';

const DATA_URL = 'https://dl.dropboxusercontent.com/s/uvz12ze382yuqyb/mak-vectors.jsonl.gz';

const DATA_PATH = '../data/mak-vectors.jsonl.gz';

const INGEST_BATCH_SIZE = 1000;

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

  const stream = 
    fs.createReadStream(DATA_PATH)
      .pipe(zlib.createGunzip());

  const lr = new LineByLineReader(stream);

  let batch = [];

  lr.on('line', line => {
    batch.push({
      id: uuidv4(),
      payload: { 
        id: line.priref, 
        museum: 'MAK'
      }, 
      vector: line.vector
    });

    // TODO batch + ingest
    // lr.pause();

  });

  lr.on('end', () => {
    console.log('[Qdrant] Ingest complete');
  });
}

export default {
  init
}