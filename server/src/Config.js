export default { 
  API_PORT: 3000,

  DATA: [
    ['WM',  'data/combined_img2vec_sbert_wm_192d.jsonl.gz'],
    ['MAK', 'data/combined_img2vec_sbert_mak_192d.jsonl.gz'],
    ['BEL', 'data/combined_img2vec_sbert_bel_192d.jsonl.gz']
  ],

  DIMENSION: 192,

  HOSTS: {
    ELASTIC: 'localhost',
    QDRANT: 'localhost',   
    RETHINK: 'localhost',
  }

 };