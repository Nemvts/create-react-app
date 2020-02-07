// @flow
import { createSelector } from 'reselect';
import { reducer } from './training.reducer';

const { sliceSelector } = reducer;

export const studentNameSelector = createSelector(
  sliceSelector,
  trainingSlice => trainingSlice.studentName
);
