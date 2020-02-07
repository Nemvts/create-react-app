// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'lesson8';

const initialState = {
  operand1: 0,
  operation: '+',
  operand2: 8,
  isComputing: false,
  result: '', // store result returned by remote API
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
