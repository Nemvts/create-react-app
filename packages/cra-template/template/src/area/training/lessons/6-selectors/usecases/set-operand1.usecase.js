// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../lesson6.reducer';

export const SET_OPERAND1: string = reducer.suffixKey('SET_OPERAND1'); // Action Type constant
export const setOperand1Action = createAction(SET_OPERAND1); // Action Creator function

export const actionReducerMap = {
  [SET_OPERAND1]: (state, action) => {
    // console.log('reduce SET_OPERAND1', state, action); // eslint-disable-line no-console
    const value = parseInt(action.payload, 10);
    return {
      ...state,
      operand1: Number.isNaN(value) ? 0 : value,
      result: '',
    };
  },
};

reducer.addActionReducerMap(actionReducerMap);
