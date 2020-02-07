// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'lesson7';

const initialState = {
  operand1: 0,
  operation: '+',
  operand2: 7,
  // the computed result is not in the store!
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
