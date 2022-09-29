import fs from 'fs';
import Papa from 'papaparse';

const Embeddings = path => new Promise(resolve => {
  console.log('Loading embedding vectors');

  const stream = fs.createReadStream(path);

  const config = {
    header: false
  };

  const get = data => { 
    console.log('Vectors loaded - indexing');
    
    const indexed = {};

    data.forEach(row => {
      const [identifier, ...vector] = row;
      indexed[identifier] = vector.map(str => parseFloat(str));
    });

    console.log('Indexing complete');

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