// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  axiosApi,
  getHistory,
  getAppSettings,
  mergeSaga,
} from '@dealersocket/react-common';
import { toastr } from 'react-redux-toastr';
import { showError } from 'shared/utils/show-errors';
import { reducer } from '../../course.reducer';

const DELETE_COURSE = reducer.suffixKey('DELETE_COURSE');
export const deleteCourseAction = createAction(DELETE_COURSE);
const DELETE_COURSE_SUCCESS = reducer.suffixKey('DELETE_COURSE_SUCCESS');
const DELETE_COURSE_ERROR = reducer.suffixKey('DELETE_COURSE_ERROR');

function* deleteCourseWatch(): any {
  yield takeEvery(DELETE_COURSE, deleteCourseWorker);
}
mergeSaga(deleteCourseWatch);

function* deleteCourseWorker(action: any): any {
  const course = action.payload;
  try {
    yield call(deleteCourse, course.id);
    yield put(createAction(DELETE_COURSE_SUCCESS)(course));
    yield call(toastr.warning, 'Course Deleted');
    yield call(getHistory().push, '/courses');
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(DELETE_COURSE_ERROR)(e));
  }
}

function deleteCourse(id: string) {
  return axiosApi(`${getAppSettings().globalApiUrl}/sandbox/courses/${id}`, {
    method: 'delete',
  });
}

const actionReducerMap = {
  [DELETE_COURSE_SUCCESS]: (state, action) => {
    const courseDeleted = action.payload;
    const newCourses = state.courses.filter(c => c.id !== courseDeleted.id);
    return {
      ...state,
      courses: newCourses,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  DELETE_COURSE,
  DELETE_COURSE_ERROR,
  DELETE_COURSE_SUCCESS,
  deleteCourseWatch,
  deleteCourseWorker,
  deleteCourse,
  actionReducerMap,
};
