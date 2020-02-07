// @flow
import { createAction } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  axiosApi,
  getAppSettings,
  mergeSaga,
} from '@dealersocket/react-common';
import { showError } from 'shared/utils/show-errors';
import { reducer } from '../dallas-class.reducer';
import { selectedFoundStudentIdsSelector } from '../dallas-class.selectors';

const REMOVE_SELECTED_STUDENTS = reducer.suffixKey('REMOVE_SELECTED_STUDENTS');
export const removeSelectedStudentsAction = createAction(
  REMOVE_SELECTED_STUDENTS
);
const REMOVE_SELECTED_STUDENTS_SUCCESS = reducer.suffixKey(
  'REMOVE_SELECTED_STUDENTS_SUCCESS'
);
const REMOVE_SELECTED_STUDENTS_ERROR = reducer.suffixKey(
  'REMOVE_SELECTED_STUDENTS_ERROR'
);

function* removeSelectedStudentsWatch(): any {
  yield takeEvery(REMOVE_SELECTED_STUDENTS, removeSelectedStudentsWorker);
}
mergeSaga(removeSelectedStudentsWatch);

function* removeSelectedStudentsWorker(): any {
  const ids = yield select(selectedFoundStudentIdsSelector);
  if (ids.length === 0) {
    return;
  }
  try {
    yield call(removeSelectedStudents, ids);
    yield put(createAction(REMOVE_SELECTED_STUDENTS_SUCCESS)(ids));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(REMOVE_SELECTED_STUDENTS_ERROR)(e));
  }
}

function removeSelectedStudents(ids: number[]) {
  return axiosApi(`${getAppSettings().globalApiUrl}/sandbox/students`, {
    data: ids,
    method: 'delete',
  });
}

const actionReducerMap = {
  [REMOVE_SELECTED_STUDENTS]: slice => {
    return {
      ...slice,
      isBulkProcessing: true,
    };
  },
  [REMOVE_SELECTED_STUDENTS_ERROR]: slice => {
    return {
      ...slice,
      isBulkProcessing: false,
    };
  },
  [REMOVE_SELECTED_STUDENTS_SUCCESS]: (slice, action) => {
    const removedStudentIds = action.payload;
    const students = slice.students.filter(
      student => !removedStudentIds.includes(student.id)
    );
    const selectedStudentIds = slice.selectedStudentIds.filter(
      id => !removedStudentIds.includes(id)
    );

    return {
      ...slice,
      isBulkProcessing: false,
      students,
      selectedStudentIds,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  REMOVE_SELECTED_STUDENTS,
  REMOVE_SELECTED_STUDENTS_ERROR,
  REMOVE_SELECTED_STUDENTS_SUCCESS,
  removeSelectedStudentsWatch,
  removeSelectedStudentsWorker,
  removeSelectedStudents,
  actionReducerMap,
};
