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

export const storeCollection = collection => {
  const record = {
    id: nanoid(), 
    items: collection
  };

  return connect()
    .then(({ conn, table }) => table
      .insert(record, { conflict: 'replace' })
      .run(conn));
}

export const getCollection = id =>
  connect() 
    .then(({ conn, table }) => table
      .get(id)
      .run(conn));