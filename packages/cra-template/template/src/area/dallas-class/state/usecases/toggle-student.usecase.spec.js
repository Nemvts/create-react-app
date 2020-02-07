// @flow
import { toggleStudentAction, testPort } from './toggle-student.usecase';

const { TOGGLE_STUDENT, actionReducerMap } = testPort;

describe('toggle-student.usecase', () => {
  const studentId = 3;
  const payload = {
    id: studentId,
  };

  it('handles TOGGLE_STUDENT set', () => {
    const initialSlice = {
      selectedStudentIds: [],
    };
    const expectedSlice = {
      selectedStudentIds: [studentId],
    };
    const slice = actionReducerMap[TOGGLE_STUDENT](
      initialSlice,
      toggleStudentAction(payload)
    );
    expect(slice).toEqual(expectedSlice);
  });

  it('handles TOGGLE_STUDENT unset', () => {
    const initialSlice = {
      selectedStudentIds: [2, studentId],
    };
    const expectedSlice = {
      selectedStudentIds: [2],
    };
    const slice = actionReducerMap[TOGGLE_STUDENT](
      initialSlice,
      toggleStudentAction(payload)
    );
    expect(slice).toEqual(expectedSlice);
  });
});
