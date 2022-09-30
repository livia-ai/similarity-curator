import fs from 'fs';
import zlib from 'zlib';
import LineByLineReader from 'line-by-line';

const MAPPING = {
  properties: {
    id: { type: 'keyword' },
    museum: { type: 'keyword' },
    title: { type: 'text' },
    description: { type: 'text' },
    record_url: { type: 'keyword', index: false },
    image_url: { type: 'keyword', index: false }
  }
}

const DATA = [
  ['WM', '../data/image_embeddings_wm_128d.jsonl.gz'],
  // ['MAK', '../data/image_embeddings_mak_128d.jsonl.gz'],
  ['BEL', '../data/image_embeddings_bel_128d.jsonl.gz']
];

const INGEST_BATCH_SIZE = 5000;

const init = client => () => {
  console.log('[ElasticSearch] Checking if index exists');

  client.indices.exists({ index: 'livia' }).then(exists => {
    if (exists) {
      console.log('[ElasticSearch] index exists - skipping');
    } else {
      client.indices.create({ 
        index: 'livia',
        body: { mappings: MAPPING }
      }).then(() => {
        console.log('[ElasticSearch] No index - created new');
        console.log('[ElasticSearch] Loading data');

        ingest(client).then(data => {
          console.log('[ElasticSearch] Ingest complete');       
        });
      });
    }
  });
}

const ingest = client => {

  const ingestOneBatch = data => {      
    const operations = data.flatMap(doc => ([ { index: { _index: 'livia' } }, doc ]));
    console.log(`[ElasticSearch] Ingesting batch (${data.length} records)`);

    return client.bulk({ refresh: true, operations }).then(() => {
      console.log('[ElasticSearch] Done' );
    })  
  }

  const ingestOneDataset = (museum, path) => new Promise(resolve => {
    console.log(`Ingesting dataset: ${path}`);
    
    const stream = 
      fs.createReadStream(path)
        .pipe(zlib.createGunzip());

      const lr = new LineByLineReader(stream);

      let batch = [];

      lr.on('line', line => {
        const json = JSON.parse(line);

        batch.push({
          id: String(json.id),
          museum,
          title: json.title,
          description: json.description ? json.description : null, 
          record_url: json.url,
          image_url: json.reproduction
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
            resolve();
          });
        } else {
          resolve();
        }
      });
  });

  return DATA.reduce((res, d) => {
    const [museum, path] = d;
    return res.then(() => ingestOneDataset(museum, path));
  }, new Promise(resolve => resolve()));
}

export default init;


