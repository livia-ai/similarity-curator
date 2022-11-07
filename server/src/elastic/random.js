import { nanoid } from 'nanoid';

import { simplifySearchResults } from './index.js';

const getRandom = client => () => client.search({
  index: 'livia',
  query: {
    function_score: {
      random_score: {
        seed: nanoid() + new Date().getTime(),
        field: 'record_url'
      }
    }
  },
  size: 1
}).then(simplifySearchResults);

export default getRandom;
