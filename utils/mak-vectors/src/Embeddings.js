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
      const [priref, ...vector] = row;
      indexed[priref] = vector.map(str => parseFloat(str));
    });

    console.log('Indexing complete');

    return priref => indexed[priref];
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