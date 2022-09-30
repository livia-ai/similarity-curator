import es from '../elastic/index.js';
import qdrant from '../qdrant/index.js';

export default (req, res) => {

  const { museum, id } = req.query;

  console.log(museum, id);

  const k = req.query.k ? parseInt(req.query.k) : 10;

  return (!museum || !id) ?
    res
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ error: 'Missing parameter: `museum` and/or `id`' }) : 

    qdrant.getNeighbours(museum, id, k)
      .then(records => {
        console.log('Got nearest neighbour points for ' + museum + ' ' + id);
        console.log(records);
        return es.retrieve(records)
      });

}