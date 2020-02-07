// @flow
import { reducer as lessonReducer } from '../lesson5.reducer';
import { setOperand1Action, SET_OPERAND1 } from './set-operand1.usecase';

describe('Lesson 5 - setOperand1 usecase', () => {
  it('should create an add action', () => {
    const expectedAction = {
      type: SET_OPERAND1,
    };
    expect(setOperand1Action()).toEqual(expectedAction);
  });

  it('should handle the SET_OPERAND1 action', () => {
    const initialState = {
      operand1: 5,
      operation: '+',
      operand2: 5,
      result: 10,
    };
    const expectedState = {
      operand1: 8,
      operation: '+',
      operand2: 5,
      result: '',
    };
    const actualState = lessonReducer(initialState, {
      type: SET_OPERAND1,
      payload: 8,
    });
    expect(actualState).toEqual(expectedState);
  });
});
