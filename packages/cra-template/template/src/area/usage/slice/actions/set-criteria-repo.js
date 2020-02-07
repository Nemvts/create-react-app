// @flow
import { createAction } from 'redux-actions';
import { usageReducer } from '../usage.reducer';

const SET_CRITERIA_REPO: string = usageReducer.suffixKey('SET_CRITERIA_REPO');
export const setCriteriaRepoAction = createAction(SET_CRITERIA_REPO);

const actionReducerMap = {
  [SET_CRITERIA_REPO]: (slice, action) => {
    const criteriaRepo = action.payload;
    return {
      ...slice,
      criteriaRepo,
    };
  },
};
usageReducer.addActionReducerMap(actionReducerMap);
