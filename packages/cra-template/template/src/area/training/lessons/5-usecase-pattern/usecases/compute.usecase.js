// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../lesson5.reducer';

export const COMPUTE: string = reducer.suffixKey('COMPUTE'); // Action Type constant
export const computeAction = createAction(COMPUTE); // Action Creator function

export const actionReducerMap = {
  // the Key is the Action Type and the Value is the Reducer function
  [COMPUTE]: (state, action) => {
    console.log('reduce COMPUTE', state, action); // eslint-disable-line no-console
    const result = state.operand1 + state.operand2;
    return {
      ...state,
      result,
    };
  },
};

reducer.addActionReducerMap(actionReducerMap);
