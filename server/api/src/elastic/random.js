import { simplifySearchResults } from './index.js';

const getRandom = client => () => client.search({
  index: 'livia',
  query: {
    function_score: {
      random_score: {}
    }
  },
  size: 1
}).then(simplifySearchResults);

export default getRandom;
