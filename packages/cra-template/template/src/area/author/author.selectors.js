// @flow
import { createSelector } from 'reselect';
import { reducer } from './author.reducer';

const { sliceSelector } = reducer;

export const authorsSelector = createSelector(
  sliceSelector,
  state => state.authors
);

export const authorsFormattedForDropdownSelector = createSelector(
  sliceSelector,
  state => {
    const { authors } = state;
    if (authors) {
      return authors.map(author => ({
        value: author.id,
        text: `${author.firstName} ${author.lastName}`,
      }));
    }
    return [];
  }
);

export const getAuthorNameByIdSelector = createSelector(
  sliceSelector,
  state => {
    const { authors } = state;
    if (authors) {
      return authors.map(author => ({
        value: author.id,
        text: `${author.firstName} ${author.lastName}`,
      }));
    }
    return [];
  }
);
