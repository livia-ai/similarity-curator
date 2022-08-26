import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';
import LineByLineReader from 'line-by-line';
import zlib from 'zlib';
import { Qdrant } from 'qdrant';

const DATA_URL = 'https://dl.dropboxusercontent.com/s/u72c07in2b2pkn2/mak-vectors.jsonl.gz';

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

  const ingestOneBatch = batch => {
    console.log('[Qdrant] Ingesting batch of ' + batch.length);
    return client.upload_points('livia', batch).then(result => {
      if (result.err) {
        console.error('[Qdrant] ERROR Import error');
        console.error(result.err);
      }
    });
  }

  const stream = 
    fs.createReadStream(DATA_PATH)
      .pipe(zlib.createGunzip());

  const lr = new LineByLineReader(stream);

  let batch = [];

  lr.on('line', line => {
    const json = JSON.parse(line);

    batch.push({
      id: uuidv4(),
      payload: { 
        id: json.priref, 
        museum: 'MAK'
      }, 
      vector: json.vector
    });

    if (batch.length === INGEST_BATCH_SIZE) {
      lr.pause();

      ingestOneBatch(batch).then(() => {
        batch = [];
        lr.resume();  
      });
    }
  });

  lr.on('end', () => {
    if (batch.length > 0)
      ingestOneBatch(batch).then(() => {
        console.log('[Qdrant] Ingest complete');
      });
  });
}

export default {
  init
}