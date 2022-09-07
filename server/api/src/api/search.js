import es from '../elastic/index.js';

export default (req, res) => {
  const query = req.query.q; 
  const size = req.query.size || 10;

  return (!query) ?
    res
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ error: 'Missing parameter: `q`' })  :
  
    es.search(query, size);
}