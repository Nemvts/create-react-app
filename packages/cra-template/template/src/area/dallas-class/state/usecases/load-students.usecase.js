// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { showError } from 'shared/utils/show-errors';
import {
  axiosApi,
  getAppSettings,
  mergeSaga,
} from '@dealersocket/react-common';
import { reducer } from '../dallas-class.reducer';
import type { StudentType } from '../../dallas-class.types';

const LOAD_STUDENTS: string = reducer.suffixKey('LOAD_STUDENTS');
export const loadStudentsAction = createAction(LOAD_STUDENTS);
const LOAD_STUDENTS_SUCCESS: string = reducer.suffixKey(
  'LOAD_STUDENTS_SUCCESS'
);
const LOAD_STUDENTS_ERROR: string = reducer.suffixKey('LOAD_STUDENTS_ERROR');

function* loadStudentsWatch(): any {
  yield takeEvery(LOAD_STUDENTS, loadStudentsWorker);
}
mergeSaga(loadStudentsWatch);

function* loadStudentsWorker(): any {
  try {
    const result = yield call(loadStudents);
    yield put(createAction(LOAD_STUDENTS_SUCCESS)(result));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(LOAD_STUDENTS_ERROR)(e));
  }
}

function loadStudents(): Promise<StudentType[]> {
  return axiosApi(`${getAppSettings().globalApiUrl}/sandbox/students`);
}

const actionReducerMap = {
  [LOAD_STUDENTS]: slice => {
    return {
      ...slice,
      isLoading: true,
      students: null,
    };
  },
  [LOAD_STUDENTS_ERROR]: slice => {
    return {
      ...slice,
      isLoading: false,
    };
  },
  [LOAD_STUDENTS_SUCCESS]: (slice, action) => {
    return {
      ...slice,
      isLoading: false,
      students: action.payload,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  LOAD_STUDENTS,
  LOAD_STUDENTS_ERROR,
  LOAD_STUDENTS_SUCCESS,
  loadStudentsWatch,
  loadStudentsWorker,
  loadStudents,
  actionReducerMap,
};
