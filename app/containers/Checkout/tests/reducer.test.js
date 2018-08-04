
import { fromJS } from 'immutable';
import checkoutReducer from '../reducer';

describe('checkoutReducer', () => {
  it('returns the initial state', () => {
    expect(checkoutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
