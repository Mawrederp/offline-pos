import PouchDB from 'pouchdb-browser';

PouchDB.plugin(require('pouchdb-find').default);
const url = 'http://127.0.0.1:5984/';
const Prefix = 'pos_app';
const syncEvents = ['change', 'paused', 'active', 'denied', 'complete', 'error'];

function initDB(path, isLocal = false) {
  const db = new PouchDB(path);
  return {
    db,
    replication: isLocal ? null :
      db.sync(`${url}${path}`, {live: true, retry: true}).on('error', (err) => {
        console.log(err);
        const remote = new PouchDB(`${url}${Prefix}/${path}`);
      }),
  }
    ;
}

export default {
  auth: initDB('auth'),
  app: initDB('app', true),
  tellers: initDB('tellers'),
};
