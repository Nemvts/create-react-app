// @flow
import { createAction } from 'redux-actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { showError } from 'shared/utils/show-errors';
import {
  axiosApi,
  getAppSettings,
  mergeSaga,
} from '@dealersocket/react-common';
import { reducer } from '../../course.reducer';
import { coursesSelector } from '../../course.selectors';

const LOAD_COURSES: string = reducer.suffixKey('LOAD_COURSES');
export const loadCoursesAction = createAction(LOAD_COURSES);
const LOAD_COURSES_SUCCESS: string = reducer.suffixKey('LOAD_COURSES_SUCCESS');
const LOAD_COURSES_ERROR: string = reducer.suffixKey('LOAD_COURSES_ERROR');

function* loadCoursesWatch(): any {
  yield takeLatest(LOAD_COURSES, loadCoursesWorker);
}
mergeSaga(loadCoursesWatch);

function* loadCoursesWorker(): any {
  const courses = yield select(coursesSelector);
  if (courses && courses.length) {
    return;
  }
  try {
    const result = yield call(loadCourses);
    yield put(createAction(LOAD_COURSES_SUCCESS)(result));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(LOAD_COURSES_ERROR)(e));
  }
}

function loadCourses(): Promise<any> {
  return axiosApi(`${getAppSettings().globalApiUrl}/sandbox/courses`);
}

const actionReducerMap = {
  [LOAD_COURSES_SUCCESS]: (state, action) => {
    return {
      ...state,
      courses: action.payload,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  LOAD_COURSES,
  LOAD_COURSES_ERROR,
  LOAD_COURSES_SUCCESS,
  loadCoursesWatch,
  loadCoursesWorker,
  loadCourses,
  actionReducerMap,
};
