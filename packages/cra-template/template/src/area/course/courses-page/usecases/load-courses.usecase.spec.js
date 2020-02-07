// @flow
import { createAction } from 'redux-actions';
import { call, put, select } from 'redux-saga/effects';
import { create as createAxios } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { axiosHelper, setAppSettings } from '@dealersocket/react-common';
import appSettings from '../../../../../public/app.settings.json';
import { mockApi } from '../../mock/course.mock-api';
import courses from '../../mock/courses.json';
import { coursesSelector } from '../../course.selectors';
import { testPort } from './load-courses.usecase';

const { LOAD_COURSES_SUCCESS, loadCoursesWorker, loadCourses } = testPort;

// Note: To test delay you must mock it.
// import { delay } from 'redux-saga';
// jest.mock('redux-saga');

describe('loadCoursesUsecase', () => {
  it('loadCoursesWorker with courses', () => {
    const existingCourses = ['a', 'b'];
    const gen = loadCoursesWorker();
    expect(gen.next().value).toEqual(select(coursesSelector));
    expect(gen.next(existingCourses)).toEqual({ done: true, value: undefined });
  });

  it('loadCoursesWorker with no courses', () => {
    // let existingCourses = [];
    const gen = loadCoursesWorker();
    expect(gen.next().value).toEqual(select(coursesSelector));
    expect(gen.next().value).toEqual(call(loadCourses));
    const existingCourses = ['a', 'b'];
    expect(gen.next(existingCourses).value).toEqual(
      put(createAction(LOAD_COURSES_SUCCESS)(existingCourses))
    );
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

  it('loadCourses should return a promise which returns courses array', done => {
    setAppSettings(appSettings);
    const axiosInstance = createAxios();
    axiosHelper.setAxios(axiosInstance);
    mockApi(new MockAdapter(axiosInstance));

    const resultPromise = loadCourses();
    resultPromise.then(
      result => {
        expect(result).toEqual(courses);
        done();
      },
      () => {
        // console.log('err', err);
        done();
      }
    );
  });
});
