import fs from 'fs';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import LineByLineReader from 'line-by-line';
import zlib from 'zlib';
import Config from '../Config.js';

const BASE = 'http://localhost:6333';

const SCHEMA = {
  name: 'livia',
  vectors: {
    size: 128,
    distance: 'Cosine'
  }
};

const INGEST_BATCH_SIZE = 5000;

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const init = async () => {
  console.log('[Qdrant] Checking if collections exists');

  const response = await fetch(BASE + '/collections/livia').then(res => res.json());

  if (response.result) {
    console.log('[Qdrant] Exists');
  } else {
    console.log('[Qdrant] No collection - creating new');

    await fetch(BASE + '/collections/livia', {
      method: 'PUT',
      headers,
      body: JSON.stringify(SCHEMA)
    });

    await fetch(BASE + '/collections/livia/index', {
      method: 'POST',
      headers,
      body: JSON.stringify({ field_name: 'id', field_schema: 'keyword' })
    });

    await fetch(BASE + '/collections/livia/index', {
      method: 'POST',
      headers,
      body: JSON.stringify({ field_name: 'museum', field_schema: 'keyword' })
    });

    return ingest();
  }
}

/*
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
*/

const ingest = async () => {
  console.log('[Qdrant] Preparing data for ingest');

  const ingestOneBatch = batch => {
    console.log('[Qdrant] Ingesting batch of ' + batch.length);

    return fetch(BASE + '/collections/livia/points', {
      method: 'PUT',
      headers,
      body: JSON.stringify({ points: batch })
    }).then(res => res.json()).then(result => {
      if (result.err) {
        console.error('[Qdrant] ERROR Import error');
        console.error(result.err);
      }
    });
  }

  const ingestOneDataset = (museum, path) => new Promise(resolve => {
    console.log('[Qdrant] Ingesting dataset ' + path);

    const stream = 
      fs.createReadStream(path)
        .pipe(zlib.createGunzip());

    const lr = new LineByLineReader(stream);

    let batch = [];

    lr.on('line', line => {    
      const json = JSON.parse(line);

      if (!json.vec)
        console.log('No vector', line);

      batch.push({
        id: uuidv4(),
        payload: { 
          id: String(json.id),
          museum
        }, 
        vector: json.vec
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
      if (batch.length > 0) {
        ingestOneBatch(batch).then(() => {
          resolve()
        });
      } else {
        resolve();
      }
    });
  });

  return Config.DATA.reduce((res, d) => {
    const [museum, path] = d;
    return res.then(() => ingestOneDataset(museum, path));
  }, new Promise(resolve => resolve()));
}

export default init;
