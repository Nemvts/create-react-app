// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  axiosApi,
  getAppSettings,
  mergeSaga,
} from '@dealersocket/react-common';
import { showError } from 'shared/utils/show-errors';
import { reducer } from '../dallas-class.reducer';
import type { StudentType } from '../../dallas-class.types';

const REMOVE_STUDENT = reducer.suffixKey('REMOVE_STUDENT');
export const removeStudentAction = createAction(REMOVE_STUDENT);
const REMOVE_STUDENT_ERROR = reducer.suffixKey('REMOVE_STUDENT_ERROR');
const REMOVE_STUDENT_SUCCESS = reducer.suffixKey('REMOVE_STUDENT_SUCCESS');

function* removeStudentWatch(): any {
  yield takeEvery(REMOVE_STUDENT, removeStudentWorker);
}
mergeSaga(removeStudentWatch);

function* removeStudentWorker(action: any): any {
  const student = action.payload;
  try {
    yield call(removeStudent, student.id);
    yield put(createAction(REMOVE_STUDENT_SUCCESS)(student));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(REMOVE_STUDENT_ERROR)(student));
  }
}

function removeStudent(id: string) {
  return axiosApi(`${getAppSettings().globalApiUrl}/sandbox/students/${id}`, {
    method: 'delete',
  });
}

const actionReducerMap = {
  [REMOVE_STUDENT]: (slice, action) => {
    const studentToRemove: StudentType = action.payload;
    const removingStudentIds = slice.removingStudentIds.concat(
      studentToRemove.id
    );
    return {
      ...slice,
      removingStudentIds,
    };
  },
  [REMOVE_STUDENT_ERROR]: (slice, action) => {
    const student = action.payload;
    const removingStudentIds = removeIdFromArray(
      student.id,
      slice.removingStudentIds
    );
    return {
      ...slice,
      removingStudentIds,
    };
  },
  [REMOVE_STUDENT_SUCCESS]: (slice, action) => {
    const studentRemoved = action.payload;
    const removingStudentIds = removeIdFromArray(
      studentRemoved.id,
      slice.removingStudentIds
    );
    const newStudents = slice.students.filter(
      student => student.id !== studentRemoved.id
    );

    return {
      ...slice,
      removingStudentIds,
      students: newStudents,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

function removeIdFromArray(id: number, arr: number[]) {
  const result: number[] = arr.concat();
  const index = result.indexOf(id);
  if (index !== -1) {
    result.splice(index, 1);
  }
  return result;
}

export const testPort = {
  REMOVE_STUDENT,
  REMOVE_STUDENT_ERROR,
  REMOVE_STUDENT_SUCCESS,
  removeStudentWatch,
  removeStudentWorker,
  removeStudent,
  actionReducerMap,
  removeIdFromArray,
};
