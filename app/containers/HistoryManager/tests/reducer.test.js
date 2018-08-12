
import { fromJS } from 'immutable';
import historyManagerReducer from '../reducer';

describe('historyManagerReducer', () => {
  it('returns the initial state', () => {
    expect(historyManagerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
