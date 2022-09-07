import { Client } from '@elastic/elasticsearch';

import init from './init.js';
import random from './random.js';
import retrieve from './retrieve.js';
import search from './search.js';

const client = new Client({ node: 'http://localhost:9200' });

/**
 * Reduces the full ES result to a smaller representation, 
 * including (mostly) just the '_source' field.
 */
export const simplifySearchResults = esResult => ({
  took: esResult.took,
  total: esResult.hits.total,
  hits: esResult.hits.hits.map(hit => hit._source)
})

export default { 
  random: random(client), 
  init: init(client), 
  retrieve: retrieve(client), 
  search: search(client) 
}