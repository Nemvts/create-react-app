// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../dallas-class.reducer';

const TOGGLE_STUDENT: string = reducer.suffixKey('TOGGLE_STUDENT');
export const toggleStudentAction = createAction(TOGGLE_STUDENT);

const actionReducerMap = {
  [TOGGLE_STUDENT]: (slice, action) => {
    const { id } = action.payload;
    const selectedStudentIds = slice.selectedStudentIds.concat();
    const index = selectedStudentIds.indexOf(id);
    if (index === -1) {
      selectedStudentIds.push(id);
    } else {
      selectedStudentIds.splice(index, 1);
    }

    return {
      ...slice,
      selectedStudentIds,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  TOGGLE_STUDENT,
  actionReducerMap,
};
