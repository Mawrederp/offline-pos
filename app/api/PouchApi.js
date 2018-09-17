import { storage } from '../storage';

class PouchApi {

  static createDesignDoc(name, mapFunction) {
    const ddoc = {
      _id: `_design/${name}`,
      views: {},
    };
    ddoc.views[name] = { map: mapFunction.toString() };
    return ddoc;
  }
}
export default PouchApi;
