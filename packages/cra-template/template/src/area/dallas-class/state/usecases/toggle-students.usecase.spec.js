// @flow
import { toggleStudentsAction, testPort } from './toggle-students.usecase';
import students from '../../mock/dallas-students.json';

const { TOGGLE_STUDENTS, actionReducerMap } = testPort;

describe('toggle-student.usecase', () => {
  const studentA = students[2];
  const studentB = students[3];
  const payload = [studentA, studentB];

  it('handles TOGGLE_STUDENTS set', () => {
    const initialSlice = {
      selectedStudentIds: [],
      students,
    };
    const expectedSlice = {
      selectedStudentIds: [studentA.id, studentB.id],
      students,
    };
    const slice = actionReducerMap[TOGGLE_STUDENTS](
      initialSlice,
      toggleStudentsAction(payload)
    );
    expect(slice).toEqual(expectedSlice);
  });

  it('handles TOGGLE_STUDENTS unset', () => {
    const initialSlice = {
      selectedStudentIds: [studentA.id, studentB.id],
      students,
    };
    const expectedSlice = {
      selectedStudentIds: [],
      students,
    };
    const slice = actionReducerMap[TOGGLE_STUDENTS](
      initialSlice,
      toggleStudentsAction(payload)
    );
    expect(slice).toEqual(expectedSlice);
  });
});
