// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../../../lesson9.reducer';

const SET_OPERAND1: string = reducer.suffixKey('SET_OPERAND1');
export const setOperand1Action = createAction(SET_OPERAND1);

export const actionReducerMap = {
  [SET_OPERAND1]: (state, action) => {
    const quizReducer = quiz => {
      if (quiz.id === action.payload.quizId) {
        const value = parseInt(action.payload.value, 10);
        return {
          ...quiz,
          operand1: Number.isNaN(value) ? 0 : value,
          expectedResult: null,
          result: null,
        };
      }
      return quiz;
    };

    return {
      ...state,
      quizzes: state.quizzes.map(quizReducer),
    };
  },
};

reducer.addActionReducerMap(actionReducerMap);
