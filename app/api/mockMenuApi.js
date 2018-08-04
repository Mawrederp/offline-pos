import Data from '../data';

class mockMenuApi {
  static getMenu() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let menus = Data.menus;
        let openViews = [];
        let selectedMenuItem = null;
        let selectedOpenedMenuItem = null;

        if (Object.prototype.toString.call(menus) === '[object Array]'
        && menus.length > 0) {
          selectedMenuItem = menus[0];
          openViews = menus.slice(0, 1);
          selectedOpenedMenuItem = openViews[0];
        } else {
          menus = [];
        }

        resolve({
          menus,
          openViews,
          selectedMenuItem,
          selectedOpenedMenuItem,
        });
      }, 500);
    });
  }
}

export default mockMenuApi;
