// @flow
import { createAction } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { axiosApi } from '@dealersocket/react-common';
import { showError } from 'shared/utils/show-errors';
import {
  removeSelectedStudentsAction,
  testPort,
} from './remove-selected-students.usecase';
import students from '../../mock/dallas-students.json';
import { selectedFoundStudentIdsSelector } from '../dallas-class.selectors';

jest.mock('@dealersocket/react-common', () => ({
  axiosApi: jest.fn(),
  getAppSettings: () => {
    return { globalApiUrl: 'api.local' };
  },
  createAndMergeSliceReducer: () => {
    return {
      addActionReducerMap: () => {},
      suffixKey: key => key,
      sliceSelector: state => state.dallasClassSlice,
    };
  },
  mergeSaga: () => {},
}));

const {
  REMOVE_SELECTED_STUDENTS,
  REMOVE_SELECTED_STUDENTS_ERROR,
  REMOVE_SELECTED_STUDENTS_SUCCESS,
  removeSelectedStudentsWatch,
  removeSelectedStudentsWorker,
  removeSelectedStudents,
  actionReducerMap,
} = testPort;

describe('remove-selected-students.usecase', () => {
  const ids = [1, 2];

  it('removeSelectedStudentsWatch', () => {
    const gen = removeSelectedStudentsWatch();
    expect(gen.next().value).toEqual(
      takeEvery(REMOVE_SELECTED_STUDENTS, removeSelectedStudentsWorker)
    );
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

  it('removeSelectedStudentsWorker none', () => {
    const gen = removeSelectedStudentsWorker();
    expect(gen.next().value).toEqual(select(selectedFoundStudentIdsSelector));
    expect(gen.next([]).value).toEqual(undefined);
  });

  it('removeSelectedStudentsWorker success', () => {
    const gen = removeSelectedStudentsWorker();
    expect(gen.next().value).toEqual(select(selectedFoundStudentIdsSelector));
    expect(gen.next(ids).value).toEqual(call(removeSelectedStudents, ids));
    expect(gen.next().value).toEqual(
      put(createAction(REMOVE_SELECTED_STUDENTS_SUCCESS)(ids))
    );
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

  it('removeSelectedStudentsWorker error', () => {
    const error = 'error';
    const gen = removeSelectedStudentsWorker();
    expect(gen.next().value).toEqual(select(selectedFoundStudentIdsSelector));
    expect(gen.next(ids).value).toEqual(call(removeSelectedStudents, ids));
    expect(gen.throw(error).value).toEqual(call(showError, error));
    expect(gen.next().value).toEqual(
      put(createAction(REMOVE_SELECTED_STUDENTS_ERROR)(error))
    );
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

  it('removeStudent should call axiosApi with expected url', () => {
    removeSelectedStudents(ids);
    expect(axiosApi).toBeCalledWith('api.local/sandbox/students', {
      data: ids,
      method: 'delete',
    });
  });

  it('handles REMOVE_SELECTED_STUDENTS', () => {
    const initialSlice = {
      isBulkProcessing: false,
    };
    const expectedSlice = {
      isBulkProcessing: true,
    };
    const slice = actionReducerMap[REMOVE_SELECTED_STUDENTS](
      initialSlice,
      removeSelectedStudentsAction()
    );
    expect(slice).toEqual(expectedSlice);
  });

  it('handles REMOVE_SELECTED_STUDENTS_ERROR', () => {
    const initialSlice = {
      isBulkProcessing: true,
    };
    const expectedSlice = {
      isBulkProcessing: false,
    };
    const slice = actionReducerMap[REMOVE_SELECTED_STUDENTS_ERROR](
      initialSlice,
      createAction(REMOVE_SELECTED_STUDENTS_ERROR)('error')
    );
    expect(slice).toEqual(expectedSlice);
  });

  it('handles REMOVE_SELECTED_STUDENTS_SUCCESS', () => {
    const initialSlice = {
      isBulkProcessing: true,
      selectedStudentIds: [5].concat(ids),
      students,
    };
    const expectedStudents = students.filter(s => !ids.includes(s.id));
    const expectedSlice = {
      isBulkProcessing: false,
      selectedStudentIds: [5],
      students: expectedStudents,
    };
    const slice = actionReducerMap[REMOVE_SELECTED_STUDENTS_SUCCESS](
      initialSlice,
      createAction(REMOVE_SELECTED_STUDENTS_SUCCESS)(ids)
    );
    expect(slice).toEqual(expectedSlice);
  });
});
