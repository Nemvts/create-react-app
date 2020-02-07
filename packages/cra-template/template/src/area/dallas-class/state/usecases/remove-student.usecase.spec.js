// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { axiosApi } from '@dealersocket/react-common';
import { showError } from 'shared/utils/show-errors';
import { removeStudentAction, testPort } from './remove-student.usecase';
import students from '../../mock/dallas-students.json';

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

const {
  REMOVE_STUDENT,
  REMOVE_STUDENT_ERROR,
  REMOVE_STUDENT_SUCCESS,
  removeStudentWatch,
  removeStudentWorker,
  removeStudent,
  actionReducerMap,
  removeIdFromArray,
} = testPort;

describe('remove-student.usecase', () => {
  const student = students[0];

  it('removeStudentWatch', () => {
    const gen = removeStudentWatch();
    expect(gen.next().value).toEqual(
      takeEvery(REMOVE_STUDENT, removeStudentWorker)
    );
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

  it('removeStudentWorker success', () => {
    const gen = removeStudentWorker(removeStudentAction(student));
    expect(gen.next().value).toEqual(call(removeStudent, student.id));
    expect(gen.next().value).toEqual(
      put(createAction(REMOVE_STUDENT_SUCCESS)(student))
    );
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

  it('removeStudentWorker error', () => {
    const gen = removeStudentWorker(removeStudentAction(student));
    expect(gen.next().value).toEqual(call(removeStudent, student.id));
    expect(gen.throw('error').value).toEqual(call(showError, 'error'));
    expect(gen.next().value).toEqual(
      put(createAction(REMOVE_STUDENT_ERROR)(student))
    );
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

  it('removeStudent should call axiosApi with expected url', () => {
    removeStudent(student.id);
    expect(axiosApi).toBeCalledWith(
      `api.local/sandbox/students/${student.id}`,
      { method: 'delete' }
    );
  });

  it('handles REMOVE_STUDENT', () => {
    const initialState = {
      removingStudentIds: [],
    };
    const expectedState = {
      removingStudentIds: [student.id],
    };
    const state = actionReducerMap[REMOVE_STUDENT](
      initialState,
      removeStudentAction(student)
    );
    expect(state).toEqual(expectedState);
  });

  it('handles REMOVE_STUDENT_ERROR', () => {
    const initialState = {
      removingStudentIds: [student.id],
    };
    const expectedState = {
      removingStudentIds: [],
    };
    const state = actionReducerMap[REMOVE_STUDENT_ERROR](
      initialState,
      createAction(REMOVE_STUDENT_ERROR)(student)
    );
    expect(state).toEqual(expectedState);
  });

  it('handles REMOVE_STUDENT_SUCCESS', () => {
    const initialState = {
      removingStudentIds: [student.id],
      students: [student],
    };
    const expectedState = {
      removingStudentIds: [],
      students: [],
    };
    const state = actionReducerMap[REMOVE_STUDENT_SUCCESS](
      initialState,
      createAction(REMOVE_STUDENT_SUCCESS)(student)
    );
    expect(state).toEqual(expectedState);
  });

  it('removeIdFromArray', () => {
    expect(removeIdFromArray(2, [1, 2, 3])).toEqual([1, 3]);
    expect(removeIdFromArray(2, [1, 3])).toEqual([1, 3]);
    expect(removeIdFromArray(2, [])).toEqual([]);
  });
});
