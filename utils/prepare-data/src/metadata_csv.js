import fs from 'fs';
import Papa from 'papaparse';
import Embeddings from './embeddings.js';

/* Belvedere config
const METADATA = '../../../data/Belvedere/belvedere_flattened_20220601.csv';
const EMBEDDINGS = '../../../data/Belvedere/bel_image_embedding.csv';

const FIELDS = {
  id: 'Identifier',
  url: 'IsShownAt', 
  title: 'Title',
  description: 'Description',
  reproduction: 'Object',
}
*/

// Wien Museum config
const METADATA = '../../../data/Wien Museum/wien_museum_flattened_20220311.csv';
const EMBEDDINGS = '../../../data/Wien Museum/wm_image_embedding.csv';

const FIELDS = {
  id: 'id',
  url: 'url', 
  title: 'title',
  reproduction: 'multimedia_preview',
}

const embeddings = await Embeddings(EMBEDDINGS);

const config = { header: true };

const fData = new Promise(resolve => {
  const stream = fs.createReadStream(METADATA);

  Papa.parse(stream, {
    ...config,
    complete: results => {
      resolve(results.data.map(row => {
        const normalized = {};

        for (const key in FIELDS) {
          normalized[key] = row[FIELDS[key]];
        }

        const vector = embeddings.get(normalized.id);
        normalized.vec = vector;

        if (!vector)
          console.error('No vector: ' + normalized.id);
          
        return normalized;
      }));
    },
    error: error => {
      console.log(error);
    }
  });
});

fData.then(data => {
  data.forEach(record => {
    fs.appendFileSync('results.jsonl', JSON.stringify(record) + '\n')
  });

  console.log('done', data.length);
});
