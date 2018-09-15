import PouchDB from 'pouchdb-browser';
import { TELLER_ID } from '../config/teller';

PouchDB.plugin(require('pouchdb-find').default);
const url = 'http://127.0.0.1:5984/';
const Prefix = 'pos_app';
const syncEvents = ['change', 'paused', 'active', 'denied', 'complete', 'error'];
const tellerId = `TELLER_${TELLER_ID}`;

function initDB(path, isLocal = false) {
  console.log('init db is called ', path, isLocal);
  const db = new PouchDB(path);
  return {
    db,
    replication: isLocal ? null :
      db.sync(`${url}${path}`, { live: true, retry: true }).on('error', (err) => {
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
  products: initDB(`${tellerId}_products`),
  transactions: initDB(`${tellerId}_transactions`),
};
