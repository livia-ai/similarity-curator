export const createCollection = (req, res) => {
  console.log('Create Collection');

}

export const getCollection = (req, res) => {
  console.log('Get Collection');
  
  /*
  const query = req.query.q; 
  const size = req.query.size || 25;

  console.log('query', query);
  
  return (!query) ?
    res
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ error: 'Missing parameter: `q`' })  :
  
    es.search(query, size);
  */
  
}