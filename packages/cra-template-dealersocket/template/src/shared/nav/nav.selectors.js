// @flow
import { createSelector } from 'reselect';

const selectNav = state => state.nav;

export const titleSelector = createSelector(
  selectNav,
  navState => navState.title
);
