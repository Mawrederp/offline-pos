
import { fromJS } from 'immutable';
import multiCheckoutReducer from '../reducer';

describe('multiCheckoutReducer', () => {
  it('returns the initial state', () => {
    expect(multiCheckoutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
