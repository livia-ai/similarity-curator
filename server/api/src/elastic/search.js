import { simplifySearchResults } from './index.js';

const search = client => (query, size) => client.search({
  index: 'livia',
  query: {
    match: { title: query }
  },
  size
}).then(simplifySearchResults);

export default search;