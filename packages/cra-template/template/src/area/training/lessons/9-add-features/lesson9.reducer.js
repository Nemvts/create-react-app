// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'lesson9';

const initialState = {
  isBusy: false,
  quizzes: [],
  selectedQuizId: null,
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
