// @flow
import { reducer as lessonReducer } from '../lesson5.reducer';
import { computeAction, COMPUTE } from './compute.usecase';

describe('Lesson 5 - compute usecase', () => {
  it('should create an add action', () => {
    const expectedAction = {
      type: COMPUTE,
    };
    expect(computeAction()).toEqual(expectedAction);
  });

  it('should handle the COMPUTE action', () => {
    const initialState = {
      operand1: 0,
      operation: '+',
      operand2: 5,
      result: '',
    };
    const expectedState = {
      operand1: 0,
      operation: '+',
      operand2: 5,
      result: 5,
    };
    const actualState = lessonReducer(initialState, { type: COMPUTE });
    expect(actualState).toEqual(expectedState);
  });
});
