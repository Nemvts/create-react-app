// @flow
import { createAction } from 'redux-actions';
import { COMPUTE, SET_OPERAND1 } from './lesson4.constants';

// Action Creator functions
export const computeAction = createAction(COMPUTE);
export const setOperand1Action = createAction(SET_OPERAND1);
