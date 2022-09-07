import es from '../elastic/index.js';
import qdrant from '../qdrant/index.js';

export default (req, res) => {

  const { museum, id } = req.query;

  const k = req.query.k ? parseInt(req.query.k) : 10;

  return (!museum || !id) ?
    res
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ error: 'Missing parameter: `museum` and/or `id`' }) : 

    qdrant.getNearest(museum, id, k)
      .then(records => es.retrieve(records));

}