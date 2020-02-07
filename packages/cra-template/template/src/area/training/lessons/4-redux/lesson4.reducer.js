// @flow
import { storeHelper } from '@dealersocket/react-common';
import { SLICE_NAME, COMPUTE, SET_OPERAND1 } from './lesson4.constants';

type ActionType = {
  payload?: any,
  type: string,
};

const initialState = {
  operand1: 0,
  operation: '+',
  operand2: 4,
  result: '',
};

export function reducer(state: any = initialState, action: ActionType) {
  switch (action.type) {
    case COMPUTE: {
      const result = state.operand1 + state.operand2;
      return {
        ...state,
        result,
      };
    }
    case SET_OPERAND1: {
      const value = parseInt(action.payload, 10);
      return {
        ...state,
        operand1: Number.isNaN(value) ? 0 : value,
        result: '',
      };
    }
    default:
      return state;
  }
}

reducer.sliceName = SLICE_NAME;
reducer.slicePath = SLICE_NAME;
storeHelper.mergeTopReducer(reducer);
