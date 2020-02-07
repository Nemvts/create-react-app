// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'lesson6';

const initialState = {
  operand1: 0,
  operation: '+',
  operand2: 6,
  // the computed result is not in the store!
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
