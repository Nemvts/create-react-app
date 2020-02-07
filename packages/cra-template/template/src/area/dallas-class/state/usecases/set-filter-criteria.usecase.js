// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../dallas-class.reducer';

const SET_FILTER_CRITERIA: string = reducer.suffixKey('SET_FILTER_CRITERIA');
export const setFilterCriteriaAction = createAction(SET_FILTER_CRITERIA);

const actionReducerMap = {
  [SET_FILTER_CRITERIA]: (slice, action) => {
    return {
      ...slice,
      filterCriteria: action.payload,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  SET_FILTER_CRITERIA,
  actionReducerMap,
};
