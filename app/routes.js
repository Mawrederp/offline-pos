// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'dashboardPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/DashboardPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/checkout',
      name: 'checkout',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Checkout/reducer'),
          import('containers/Checkout/sagas'),
          import('containers/ProductsManagement/sagas'),
          import('containers/Checkout'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas,productsagas, component]) => {
          injectReducer('checkout', reducer.default);
          injectSagas(sagas.default.concat(productsagas.default));
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/open-registry',
      name: 'OpenRegistry',
      getComponent(location, cb) {
        import('components/OpenRegistry')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/close-registry',
      name: 'closeRegistry',
      getComponent(location, cb) {
        import('containers/Registry')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: 'products-management',
      name: 'productsStore',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ProductsManagement/reducer'),
          import('containers/ProductsManagement/sagas'),
          import('containers/ProductsManagement'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('productsStore', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: 'invoice-report',
      name: 'invoiceReport',
      getComponent(location, cb) {
        import('components/InvoiceReport')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: 'history-manager',
      name: 'historyManager',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HistoryManager/reducer'),
          import('containers/HistoryManager/sagas'),
          import('containers/HistoryManager'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('historyManager', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/close-registry',
      name: 'registry',
      getComponent(location, cb) {
        import('containers/Registry')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
