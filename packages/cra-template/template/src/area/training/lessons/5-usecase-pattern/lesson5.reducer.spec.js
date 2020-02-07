// @flow
import { reducer as lessonReducer } from './lesson5.reducer';

describe('Lesson5 Reducer', () => {
  it('should return passed initial state when action does not match', () => {
    const initialState = { foo: 'bar' };
    const actualState = lessonReducer(initialState, {
      type: 'type does not match',
    });
    expect(actualState).toEqual(initialState);
  });

  it('should return default initial state when state is undefined', () => {
    const expectedState = {
      operand1: 0,
      operation: '+',
      operand2: 5,
      result: '',
    };
    const actualState = lessonReducer(undefined, {
      type: 'type does not match',
    });
    expect(actualState).toEqual(expectedState);
  });
});
