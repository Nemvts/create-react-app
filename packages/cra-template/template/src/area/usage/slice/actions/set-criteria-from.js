// @flow
import { createAction } from 'redux-actions';
import { usageReducer } from '../usage.reducer';

const SET_CRITERIA_FROM: string = usageReducer.suffixKey('SET_CRITERIA_FROM');
export const setCriteriaFromAction = createAction(SET_CRITERIA_FROM);

const actionReducerMap = {
  [SET_CRITERIA_FROM]: (slice, action) => {
    const criteriaFrom = action.payload;
    return {
      ...slice,
      criteriaFrom,
    };
  },
};
usageReducer.addActionReducerMap(actionReducerMap);
