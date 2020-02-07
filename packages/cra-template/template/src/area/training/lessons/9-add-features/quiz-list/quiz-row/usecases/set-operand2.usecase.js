// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../../../lesson9.reducer';

const SET_OPERAND2: string = reducer.suffixKey('SET_OPERAND2');
export const setOperand2Action = createAction(SET_OPERAND2);

export const actionReducerMap = {
  [SET_OPERAND2]: (state, action) => {
    const quizReducer = quiz => {
      if (quiz.id === action.payload.quizId) {
        const value = parseInt(action.payload.value, 10);
        return {
          ...quiz,
          operand2: Number.isNaN(value) ? 0 : value,
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
