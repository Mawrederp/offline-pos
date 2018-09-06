import { getAsyncInjectors } from './utils/asyncInjectors';


export function injectGlobalSagas(store) {
  const { injectSagas } = getAsyncInjectors(store);
  console.log(posSagas);
  injectSagas([
    posSagas.default,
  ]);
}

