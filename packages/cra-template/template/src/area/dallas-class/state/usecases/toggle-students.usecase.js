// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../dallas-class.reducer';

const TOGGLE_STUDENTS: string = reducer.suffixKey('TOGGLE_STUDENTS');
export const toggleStudentsAction = createAction(TOGGLE_STUDENTS);

const actionReducerMap = {
  [TOGGLE_STUDENTS]: (slice, action) => {
    const students = action.payload;

    let isOneUnselected = false;
    const studentIds = students.map(student => {
      const { id } = student;
      const isSelected = slice.selectedStudentIds.includes(id);
      if (!isSelected) {
        isOneUnselected = true;
      }
      return id;
    });
    const selectedStudentIds = isOneUnselected ? studentIds : [];

    return {
      ...slice,
      selectedStudentIds,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  TOGGLE_STUDENTS,
  actionReducerMap,
};
