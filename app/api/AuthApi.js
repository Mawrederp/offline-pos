import PouchApi from './PouchApi';
import { storage } from '../storage';


const authDB = storage.auth.db;
const appDB = storage.app.db;
const idKey = '_id';
const revKey = '_rev';
class AuthApi extends PouchApi {
  static async fetchUser({ email, password }) {
    console.log(email,password)
    authDB.createIndex({
      index: { fields: ['email', 'password'] },
    });
    const doc = await authDB.find({
      selector: {
        email: { $eq: email.toLowerCase() },
        password: { $eq: password },
      },

    });
    return doc.docs;
  }

  static async fetchUserById(id) {
    if (!id) return null;
    const user = await authDB.find({ selector: { _id: id }, fields: ['_id', '_rev', 'email', 'fullName', 'locale'] });
    return user.docs[0];
  }


  static async signOutCleanUp() {
    const authState = await appDB.get('userIsAuthenticated');
    console.log(authState);
    appDB.put({ _id: 'userIsAuthenticated', _rev: authState[revKey], value: false, user: '' });
  }

  static async setUserLocale(user, locale) {
    const usr = await authDB.get(user[idKey]);
    return authDB.put({ ...usr, locale });
  }

  // @todo
  // right code for this would be that in the "fetchsignin" saga
  // you would dispatch another action with the (all) effect to save the user to app db
  // also userIsAuthenticated should be a part of a doc . not having a doc by it self
  static async attemptLogin(credentials) {
    const user = await AuthApi.fetchUser(credentials);
    const id = '_id';
    console.log(user[id]);
    if (user.length > 0) {
      try {
        const response = await appDB.put({ _id: 'userIsAuthenticated', value: true, user: user[0][id] });
      } catch (err) {
        if (err.name === 'conflict') {
          // conflict!
          const userAuthState = await appDB.get('userIsAuthenticated');
          const revKey = '_rev';
          const response = await appDB.put({
            _id: 'userIsAuthenticated',
            _rev: userAuthState[revKey],
            value: true,
            user: user[0][id],
          });
        }
      }
      return user;
    }
    return null;
  }

  static async getAuthState() {
    return await appDB.get('userIsAuthenticated');
  }

  static async addUser(user) {
    try {
      const result = authDB.put({ _id: `USER_${user.email}`, ...user });
      return await result;
    } catch (err) {
      if (err.name === 'conflict') {
        const exp = { message: 'المستخدم موجود مسبقا', name: 'USER_EXISTS_CONFLICT' };
        throw (exp);
        // conflict!
      } else {
        // some other error
        throw (err);
      }
    }
  }
}

export default AuthApi;
