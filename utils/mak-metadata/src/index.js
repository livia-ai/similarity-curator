import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';
import Papa from 'papaparse';

const PATH_TO_MAK = '../data/MAK/Metadata/xml';

const parser = new XMLParser({ ignoreAttributes: false });

const files = fs.readdirSync(PATH_TO_MAK);

const getReproductions = record => {
  const { Reproduction } = record;

  if (!Reproduction)
    return [];

  const r = Array.isArray(Reproduction) ? Reproduction : [ Reproduction ];

  return r
    .filter(r => r['reproduction.reference'])
    .map(obj => obj['reproduction.reference'].replace('\\', '/'));
}

const getTextDE = obj => {
  if (obj?.value) {
    if (Array.isArray(obj.value)) {
      return obj.value.find(literal => literal['@_lang'] === 'de-DE' || literal['@_lang'] === '3')['#text'];
    } else if (obj?.value['@_lang'] === 'de-DE') {
      return obj.value['#text'];
    } else {
      return getFirstText(obj);
    }
  } else if (typeof obj === 'string' || obj instanceof String) {
    return obj;
  }
}

const meta = [];

function readOne(idx = 0) {
  const xml = fs.readFileSync(PATH_TO_MAK + '/' + files[idx], 'utf8');
  const data = parser.parse(xml);
  const record = data.adlibXML.recordList.record;

  const { priref, Title, Rights } = record;

  const title = Title && getTextDE(Title.title);

  const url = 'https://sammlung.mak.at/sammlung_online?id=collect-' + priref;

  const reproductions = getReproductions(record);

  const firstReproduction = reproductions.length > 0 ? reproductions[0] : null;

  const rights = Rights && Rights['rights.consent_status'] && getTextDE(Rights['rights.consent_status']);

  meta.push({ 
    priref, 
    url, 
    title, 
    reproduction: 'https://sammlung.mak.at/img/1200x1200/' + firstReproduction,
    rights 
  });

  if (idx === files.length - 1) {
    console.log('Done - writing results');

    const config = {
      quotes: true, 
      quoteChar: '"',
      escapeChar: '"',
      delimiter: ",",
      header: true
    }
    
    const csv = Papa.unparse(meta, config);
    fs.writeFileSync('result.csv', csv);
  } else {
    setTimeout(() => readOne(idx + 1), 1);
  }
}

readOne();