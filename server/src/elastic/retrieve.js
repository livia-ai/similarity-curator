import { simplifySearchResults } from './index.js';

const retrieve = client => identifiers => client.search({
  index: 'livia',
  query: {
    bool: {
      should: identifiers.map(({ museum, id}) => ({
        bool: {
          must: [
            { term: { museum } },
            { term: { id: `${id}` }}
          ]
        }            
      }))
    }
  },
  size: identifiers.length
}).then(results => simplifySearchResults(results).hits);

export default retrieve;