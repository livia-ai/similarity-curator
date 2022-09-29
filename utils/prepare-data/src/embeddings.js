import fs from 'fs';
import Papa from 'papaparse';

/** 
 * A loader & access utility for embedding data.
 * The loader expects a CSV file with an identifier
 * in the first column, and N colums with the vector
 * components.
 */
const Embeddings = path => new Promise(resolve => {
  console.log('Loading embedding vectors');

  const stream = fs.createReadStream(path);

  const config = { header: false };

  const get = data => {
    console.log('Indexing...');

    const indexed = {};

    data.forEach(row => {
      let [identifier, ...vector] = row;
    
      // LiviaAI escape convention for forward slashes
      identifier = identifier.replace('__@@__', '/');

      indexed[identifier] = vector.map(str => parseFloat(str));
    });

    console.log('Done');

    return identifier => indexed[identifier];
  }

  Papa.parse(stream, {
    ...config,
    complete: results => {
      resolve({ get: get(results.data) });
    },
    error: error => {
      console.log(error);
    }
  });
});

export default Embeddings;