// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../../lesson9.reducer';

const SELECT_QUIZ: string = reducer.suffixKey('SELECT_QUIZ');
export const selectQuizAction = createAction(SELECT_QUIZ);

export const actionReducerMap = {
  [SELECT_QUIZ]: (state, action) => {
    return {
      ...state,
      selectedQuizId: action.payload,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);
