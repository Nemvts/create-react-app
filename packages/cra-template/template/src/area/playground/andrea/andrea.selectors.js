// @flow
import { createSelector } from 'reselect';
import { reducer } from './andrea.reducer';

const { sliceSelector } = reducer;

export const calculationsSelector = createSelector(
  sliceSelector,
  slice => slice.calculations
);
