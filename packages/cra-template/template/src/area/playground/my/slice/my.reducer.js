// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'mySlice';

export type MySliceType = {
  value: number,
};

const initialState = {
  value: 1,
};

export const myReducer = createAndMergeSliceReducer(sliceName, initialState);
