// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { axiosApi } from '@dealersocket/react-common';
import { showError } from 'shared/utils/show-errors';
import { loadStudentsAction, testPort } from './load-students.usecase';
import students from '../../mock/dallas-students.json';

const {
  LOAD_STUDENTS,
  LOAD_STUDENTS_ERROR,
  LOAD_STUDENTS_SUCCESS,
  loadStudentsWatch,
  loadStudentsWorker,
  loadStudents,
  actionReducerMap,
} = testPort;

jest.mock('@dealersocket/react-common', () => ({
  axiosApi: jest.fn(),
  getAppSettings: () => {
    return { globalApiUrl: 'api.local' };
  },
  createAndMergeSliceReducer: () => {
    return {
      addActionReducerMap: () => {},
      suffixKey: key => key,
    };
  },
  mergeSaga: () => {},
}));

describe('load-students.usecase', () => {
  it('loadStudentsWatch', () => {
    const gen = loadStudentsWatch();
    expect(gen.next().value).toEqual(
      takeEvery(LOAD_STUDENTS, loadStudentsWorker)
    );
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

  it('loadStudentsWorker success', () => {
    const gen = loadStudentsWorker();
    expect(gen.next().value).toEqual(call(loadStudents));
    expect(gen.next(students).value).toEqual(
      put(createAction(LOAD_STUDENTS_SUCCESS)(students))
    );
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

  it('loadStudentsWorker error', () => {
    const gen = loadStudentsWorker();
    expect(gen.next().value).toEqual(call(loadStudents));
    expect(gen.throw('error').value).toEqual(call(showError, 'error'));
    expect(gen.next().value).toEqual(
      put(createAction(LOAD_STUDENTS_ERROR)('error'))
    );
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

  it('loadStudents should call axiosApi with expected url', () => {
    loadStudents();
    expect(axiosApi).toBeCalledWith('api.local/sandbox/students');
  });

  it('handles LOAD_STUDENTS', () => {
    const initialState = {
      isLoading: false,
      students,
    };
    const expectedState = {
      isLoading: true,
      students: null,
    };
    const state = actionReducerMap[LOAD_STUDENTS](
      initialState,
      loadStudentsAction()
    );
    expect(state).toEqual(expectedState);
  });

  it('handles REMOVE_STUDENT_ERROR', () => {
    const initialState = {
      isLoading: true,
      students: null,
    };
    const expectedState = {
      isLoading: false,
      students: null,
    };
    const state = actionReducerMap[LOAD_STUDENTS_ERROR](
      initialState,
      createAction(LOAD_STUDENTS_ERROR)('error')
    );
    expect(state).toEqual(expectedState);
  });

  it('handles LOAD_STUDENTS_SUCCESS', () => {
    const initialState = {
      isLoading: true,
      students: null,
    };
    const expectedState = {
      isLoading: false,
      students,
    };
    const state = actionReducerMap[LOAD_STUDENTS_SUCCESS](
      initialState,
      createAction(LOAD_STUDENTS_SUCCESS)(students)
    );
    expect(state).toEqual(expectedState);
  });
});
