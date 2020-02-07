// @flow
import { clearStudentsAction, testPort } from './clear-students.usecase';

const { CLEAR_STUDENTS, actionReducerMap } = testPort;

describe('clear-students.usecase', () => {
  it('handles CLEAR_STUDENTS', () => {
    const initialSlice = {
      students: [],
    };
    const expectedSlice = {
      students: null,
    };
    const slice = actionReducerMap[CLEAR_STUDENTS](
      initialSlice,
      clearStudentsAction()
    );
    expect(slice).toEqual(expectedSlice);
  });
});
