// @flow
import { lessonSelector, resultSelector } from './lesson6.selectors';

const initialState = {
  lesson6: {
    operand1: 0,
    operation: '+',
    operand2: 6,
  },
};

describe('Selectors', () => {
  it('lesson selector should return lesson6 object', () => {
    const expectedState = initialState.lesson6;
    const actualState = lessonSelector(initialState);
    expect(actualState).toEqual(expectedState);
  });

  it('result selector should return computed result', () => {
    const expectedState = 6;
    const actualState = resultSelector(initialState);
    expect(actualState).toEqual(expectedState);
  });
});
