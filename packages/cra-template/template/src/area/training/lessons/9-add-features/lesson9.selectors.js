// @flow
import { createSelector } from 'reselect';

export const lessonSelector = (state: any) => state.lesson9;

export const isBusySelector = createSelector(lessonSelector, lessonSlice => {
  return lessonSlice.isBusy;
});

export const quizzesSelector = createSelector(lessonSelector, lessonSlice => {
  return lessonSlice.quizzes;
});

export const selectedQuizIdSelector = createSelector(
  lessonSelector,
  lessonSlice => {
    return lessonSlice.selectedQuizId;
  }
);
