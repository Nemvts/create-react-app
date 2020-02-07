// @flow
import { createAction } from 'redux-actions';
import { usageReducer } from '../usage.reducer';

const SELECT_COMP: string = usageReducer.suffixKey('SELECT_COMP');
export const selectCompAction = createAction(SELECT_COMP);

const actionReducerMap = {
  [SELECT_COMP]: (slice, action) => {
    const selectedCompKey = action.payload;
    return {
      ...slice,
      selectedCompKey,
    };
  },
};
usageReducer.addActionReducerMap(actionReducerMap);
