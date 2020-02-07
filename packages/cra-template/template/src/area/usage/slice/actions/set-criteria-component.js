// @flow
import { createAction } from 'redux-actions';
import { usageReducer } from '../usage.reducer';

const SET_CRITERIA_COMPONENT: string = usageReducer.suffixKey(
  'SET_CRITERIA_COMPONENT'
);
export const setCriteriaComponentAction = createAction(SET_CRITERIA_COMPONENT);

const actionReducerMap = {
  [SET_CRITERIA_COMPONENT]: (slice, action) => {
    const criteriaComponent = action.payload;
    return {
      ...slice,
      criteriaComponent,
    };
  },
};
usageReducer.addActionReducerMap(actionReducerMap);
