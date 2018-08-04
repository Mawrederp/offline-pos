
import { fromJS } from 'immutable';
import productsManagementReducer from '../reducer';

describe('productsManagementReducer', () => {
  it('returns the initial state', () => {
    expect(productsManagementReducer(undefined, {})).toEqual(fromJS({}));
  });
});
