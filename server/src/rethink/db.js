import r from 'rethinkdb';
import { nanoid } from 'nanoid';
import Config from '../Config.js';

const RETHINK_CONFIG = {
  host: Config.HOSTS.RETHINK,
  port: 28015,
  db: 'livia'
}

const connect = () => 
  r.connect(RETHINK_CONFIG).then(conn => ({ conn, table: r.table('user_collections') }));

const exists = () =>
  r.connect(RETHINK_CONFIG)
    .then(conn => r.dbList().run(conn))
    .then(databases => databases.includes(RETHINK_CONFIG.db));

export const init = () => {
  exists().then(exists => {
    if (exists) {
      console.log('[Rethink] Exists');
    } else {
      console.log('[Rethink] No database - creating new');

      r.connect(RETHINK_CONFIG).then(conn =>
        r.dbCreate(RETHINK_CONFIG.db)
          .do(() => r.tableCreate('user_collections'))
          .do(() => r.table('user_collections').indexCreate('timestamp'))
          .run(conn));
    }
  });
}

export const createCollection = collection => {
  const record = {
    id: nanoid(), 
    ...collection
  };

  console.log(collection);

  /*
  connect()
    .then(({ conn, table }) => table
      .insert(record, { conflict: 'replace' })
      .run(conn));
  */
}

export const getCollection = id => {
  // TODO
  connect() 
    .then(({ conn, table }) => table
      .orderBy({ index: r.desc('timestamp') })
      .skip(offset)
      .limit(size)
      .run(conn))
    .then(cursor => cursor.toArray());
}
