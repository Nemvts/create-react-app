// @flow
import { addQuizAction } from './add-quiz.usecase';
import { clearQuizzesAction } from './clear-quizzes.usecase';
import { loadQuizzesAction } from './load-quizzes.usecase';
import { removeQuizAction } from './remove-quiz.usecase';
import { resetQuizzesAction } from './reset-quizzes.usecase';
import { selectNextQuizAction } from './select-next-quiz.usecase';
import { selectQuizAction } from './select-quiz.usecase';

export const quizPageActions = {
  addQuizAction,
  clearQuizzesAction,
  loadQuizzesAction,
  removeQuizAction,
  resetQuizzesAction,
  selectNextQuizAction,
  selectQuizAction,
};
