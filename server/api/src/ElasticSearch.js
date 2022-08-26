import fs from 'fs';
import Papa from 'papaparse';
import zlib from 'zlib';
import { Client } from '@elastic/elasticsearch';

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

const client = new Client({ node: 'http://localhost:9200' });

/**
 * Reduces the full ES result to a smaller representation, 
 * including (mostly) just the '_source' field.
 */
const simplifySearchResults = esResult => ({
  took: esResult.took,
  total: esResult.hits.total,
  hits: esResult.hits.hits.map(hit => hit._source)
})

const init = () => {
  console.log('[ElasticSearch] Checking if index exists');

  client.indices.exists({ index: 'livia' }).then(exists => {
    if (!exists) {
      client.indices.create({ 
        index: 'livia',
        body: { mappings: MAPPING }
      }).then(data => {
        console.log('[ElasticSearch] No index - created new');
        console.log('[ElasticSearch] Loading data');
        ingest().then(data => {
          console.log('[ElasticSearch] Preparing data for ingest');
          
          const operations = data.flatMap(doc => ([ { index: { _index: 'livia' } }, doc ]));
          console.log('[ElasticSearch] Ingesting');

          client.bulk({ refresh: true, operations }).then(bulkResponse => {
            console.log('[ElasticSearch] Ingest complete' );
          })         
        });
      });
    } else {
      console.log('[ElasticSearch] Exists');
    }
  });
}

const ingest = () => new Promise(resolve => {
  const stream = 
    fs.createReadStream('../data/mak-metadata.csv.gz')
      .pipe(zlib.createGunzip());

  const config = {
    header: true
  };

  Papa.parse(stream, {
    ...config,
    complete: results => {
      resolve(results.data.map(record => ({
        id: record.priref,
        museum: 'MAK',
        title: record.title,
        description: record.description ? record.description : null, 
        record_url: record.url,
        image_url: record.reproduction
      })));
    }
  });
});

const search = (query, size) => client.search({
  index: 'livia',
  query: {
    match: { title: query }
  },
  size
}).then(simplifySearchResults);

const retrieve = identifiers => client.search({
  index: 'livia',
  query: {
    bool: {
      should: identifiers.map(({ museum, id}) => ({
        bool: {
          must: [
            { term: { museum } },
            { term: { id }}
          ]
        }            
      }))
    }
  }
}).then(simplifySearchResults);

export default { init, retrieve, search }