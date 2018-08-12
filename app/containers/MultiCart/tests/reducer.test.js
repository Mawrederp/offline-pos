
import { fromJS } from 'immutable';
import multiCartReducer from '../reducer';

describe('multiCartReducer', () => {
  it('returns the initial state', () => {
    expect(multiCartReducer(undefined, {})).toEqual(fromJS({}));
  });
});
