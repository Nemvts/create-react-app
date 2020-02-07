// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  axiosApi,
  getAppSettings,
  getHistory,
  mergeSaga,
} from '@dealersocket/react-common';
import { toastr } from 'react-redux-toastr';
import { showError } from 'shared/utils/show-errors';
import { reducer } from '../../course.reducer';

const SAVE_COURSE: string = reducer.suffixKey('SAVE_COURSE');
export const saveCourseAction = createAction(SAVE_COURSE);
const SAVE_COURSE_SUCCESS: string = reducer.suffixKey('SAVE_COURSE_SUCCESS');
const SAVE_COURSE_ERROR: string = reducer.suffixKey('SAVE_COURSE_ERROR');

function* saveCourseWatch(): any {
  yield takeEvery(SAVE_COURSE, saveCourseWorker);
}
mergeSaga(saveCourseWatch);

function* saveCourseWorker(action: any): any {
  const course = action.payload;
  const { id } = course;
  const isNew = id === '';
  try {
    yield call(saveCourse, course);
    yield put(createAction(SAVE_COURSE_SUCCESS)(course));
    yield call(toastr.warning, isNew ? 'Course Added' : 'Course Updated');
    yield call(getHistory().push, '/courses');
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(SAVE_COURSE_ERROR)(e));
  }
}

function saveCourse(course: any, isNew: boolean) {
  return axiosApi(
    `${getAppSettings().globalApiUrl}/sandbox/courses/${course.id}`,
    {
      method: isNew ? 'put' : 'post',
      data: course,
    }
  );
}

const actionReducerMap = {
  [SAVE_COURSE_SUCCESS]: (state, action) => {
    const courseSaved = action.payload;
    const newCourses = [];
    let found = false;
    for (const c of state.courses) {
      if (c.id === courseSaved.id) {
        newCourses.push(courseSaved);
        found = true;
      } else {
        newCourses.push(c);
      }
    }
    if (!found) {
      newCourses.push(courseSaved);
    }
    return {
      ...state,
      courses: newCourses,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  SAVE_COURSE,
  SAVE_COURSE_ERROR,
  SAVE_COURSE_SUCCESS,
  saveCourseWatch,
  saveCourseWorker,
  saveCourse,
  actionReducerMap,
};
