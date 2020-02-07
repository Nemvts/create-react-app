// @flow
import { createSelector } from 'reselect';
import { myReducer, type MySliceType } from './my.reducer';

const { sliceSelector } = myReducer;

export const valueSelector = createSelector(
  sliceSelector,
  (slice: MySliceType) => slice.value
);
