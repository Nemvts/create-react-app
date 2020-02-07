// @flow
import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const usernameSelector = createSelector(
  selectUser,
  userState => userState.username
);
