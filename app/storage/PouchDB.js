import PouchDB from 'pouchdb-browser';
import { TELLER_ID } from '../config/teller';
import { ENVIRIOMENT } from '../config/';

PouchDB.plugin(require('pouchdb-find').default);
const url = `http://${ENVIRIOMENT === 'dev' ? 'localhost' : '52.15.39.17'}:5984`;
const Prefix = 'pos_app';
// const syncEvents = ['change', 'paused', 'active', 'denied', 'complete', 'error'];
const tellerId = `TELLER_${TELLER_ID}`;
window.syncdDbs = {};

function initDB(path, isLocal = false, live = true) {
  console.log('init db is called ', path, isLocal);
  const db = new PouchDB(path);
  return {
    db,
    replication: isLocal ? null :
      db.sync(`${url}${path}`, { live, retry: true }).on('error', (err) => {
        console.log(err);
        return new PouchDB(`${url}${Prefix}/${path}`);
      }).on('complete', (result) => {
        console.log('complete', result);
        window.syncdDbs[path] = true;
      }),
  }
    ;
}

export default {
  auth: initDB('auth', true),
  app: initDB('app', true),
  tellers: initDB('tellers'),
  products: initDB(`${tellerId}_products`),
  transactions: initDB(`${tellerId}_transactions`),
};
