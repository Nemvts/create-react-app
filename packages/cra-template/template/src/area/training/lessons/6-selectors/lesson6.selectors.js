// @flow
import { createSelector } from 'reselect';

export const lessonSelector = (state: any) => state.lesson6;

// export const resultSelector = (state:any) => {
//   const slice = lessonSelector(state);
//   console.log('computeResult'); // eslint-disable-line no-console
//   return slice.operand1 + slice.operand2;
// };

// using reselect's 'createSelector' the result is memoized!
// It is only recomputed if our slice state changed.
export const resultSelector = createSelector(lessonSelector, slice => {
  console.log('computeResult'); // eslint-disable-line no-console
  return slice.operand1 + slice.operand2;
});
