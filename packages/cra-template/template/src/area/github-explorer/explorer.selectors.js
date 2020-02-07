// @flow
import { createSelector } from 'reselect';
import { reducer } from './explorer.reducer';

const { sliceSelector } = reducer;

export const currentUserSelector = createSelector(
  sliceSelector,
  explorerState => explorerState.currentUser
);

export const reposSelector = createSelector(sliceSelector, explorerState => {
  return explorerState.userData.repositories;
});

export const errorSelector = createSelector(
  sliceSelector,
  explorerState => explorerState.error
);

export const loadingSelector = createSelector(
  sliceSelector,
  explorerState => explorerState.loading
);
