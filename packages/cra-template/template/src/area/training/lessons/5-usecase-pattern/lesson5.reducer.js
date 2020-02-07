// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'lesson5';

const initialState = {
  operand1: 0,
  operation: '+',
  operand2: 5,
  result: '',
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
