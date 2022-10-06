import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';
import Embeddings from './embeddings.js';

/**
 * Compiles a CSV file with one record per image, with the following columns:
 * 
 * - id (= MAK priref)
 * - url (= MAK online collection record URL) 
 * - title
 * - description,
 * - reproduction (= MAK online collection image file URL)
 * - vec (= vector)
 */ 
const MAK_METADATA = '../../../data/MAK/Metadata/xml';
// const MAK_EMBEDDINGS = '../../../data/MAK/mak_image_embedding_priref.csv';
// const MAK_EMBEDDINGS = '../../../data/MAK/img2vec_MAK_128d.csv';
const MAK_EMBEDDINGS = '../../../data/MAK/combined_embeddings_mak_192d.csv';

const parser = new XMLParser({ ignoreAttributes: false });

const embeddings = await Embeddings(MAK_EMBEDDINGS);

const files = fs.readdirSync(MAK_METADATA);

const getReproductions = record => {
  const { Reproduction } = record;

  if (!Reproduction)
    return [];

  const r = Array.isArray(Reproduction) ? Reproduction : [ Reproduction ];

  return r
    .filter(r => r['reproduction.reference'])
    .map(obj => obj['reproduction.reference'].replace('\\', '/'));
}

const getLabelDE = obj => {
  if (obj?.value) {
    if (Array.isArray(obj.value)) {
      return obj.value.find(literal => literal['@_lang'] === 'de-DE' || literal['@_lang'] === '3')['#text'];
    } else if (obj?.value['@_lang'] === 'de-DE') {
      return obj.value['#text'];
    }
  } else if (typeof obj === 'string' || obj instanceof String) {
    return obj;
  }
}

const meta = [];

function readOne(idx = 0) {
  const xml = fs.readFileSync(MAK_METADATA + '/' + files[idx], 'utf8');
  const data = parser.parse(xml);
  const record = data.adlibXML.recordList.record;

  const { priref, Description, Title, Rights } = record;

  const title = getLabelDE(Title?.title);

  const description = getLabelDE(Description?.description);

  const url = 'https://sammlung.mak.at/sammlung_online?id=collect-' + priref;

  const reproductions = getReproductions(record);
  const firstReproduction = reproductions.length > 0 ? reproductions[0] : null;

  const rights = Rights && Rights['rights.consent_status'] && getLabelDE(Rights['rights.consent_status']);

  const compactRecord = {
    id: priref,
    url, 
    title,
    description,
    reproduction: 'https://sammlung.mak.at/img/1200x1200/' + firstReproduction
  }

  // Only include records with "rights"="bewilligt"
  if (firstReproduction && rights === 'bewilligt') {
    compactRecord.vec = embeddings.get(priref);
    if (compactRecord.vec)
      meta.push(compactRecord);
    else 
      console.log('No vector for record ', priref);
  }

  if (idx === files.length - 1) {
    console.log('Writing results');

    meta.forEach(record =>
    fs.appendFileSync('results.jsonl', JSON.stringify(record) + '\n'));

    console.log('Done.');
  } else {
    setTimeout(() => readOne(idx + 1), 1);
  }
}

readOne();