// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../../lesson9.reducer';

const SELECT_NEXT_QUIZ: string = reducer.suffixKey('SELECT_NEXT_QUIZ');
export const selectNextQuizAction = createAction(SELECT_NEXT_QUIZ);

export const actionReducerMap = {
  [SELECT_NEXT_QUIZ]: (state, action) => {
    const index = state.quizzes.findIndex(
      quiz => quiz.id === state.selectedQuizId
    );
    const forward = action.payload;
    const newIndex = forward ? index + 1 : index - 1;
    const newSelectedQuiz = state.quizzes[newIndex];
    if (newSelectedQuiz) {
      return {
        ...state,
        selectedQuizId: newSelectedQuiz.id,
      };
    }
    return state;
  },
};
reducer.addActionReducerMap(actionReducerMap);
