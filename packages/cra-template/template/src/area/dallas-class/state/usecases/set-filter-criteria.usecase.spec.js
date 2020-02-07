// @flow
import {
  setFilterCriteriaAction,
  testPort,
} from './set-filter-criteria.usecase';

const { SET_FILTER_CRITERIA, actionReducerMap } = testPort;

describe('set-filter-criteria.usecase', () => {
  it('handles SET_FILTER_CRITERIA', () => {
    const payload = 'abc';
    const initialState = {
      filterCriteria: '',
    };
    const expectedState = {
      filterCriteria: payload,
    };
    const state = actionReducerMap[SET_FILTER_CRITERIA](
      initialState,
      setFilterCriteriaAction(payload)
    );
    expect(state).toEqual(expectedState);
  });
});
