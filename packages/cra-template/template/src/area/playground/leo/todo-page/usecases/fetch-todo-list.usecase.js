// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { axiosApi, mergeSaga } from '@dealersocket/react-common';
import { showError } from 'shared/utils/show-errors';
import { TodoListSchema } from '../../schema';
import { reducer } from '../../todo.reducer';

export const FETCH_TODO_LISTS: string = reducer.suffixKey('FETCH_TODO_LISTS');
export const fetchTodoListsAction = createAction(FETCH_TODO_LISTS);
export const FETCH_TODO_LISTS_ERROR: string = reducer.suffixKey(
  'FETCH_TODO_LISTS_ERROR'
);
export const FETCH_TODO_LISTS_SUCCESS: string = reducer.suffixKey(
  'FETCH_TODO_LISTS_SUCCESS'
);

function* fetchTodoListsWatch(): any {
  yield takeEvery(FETCH_TODO_LISTS, fetchTodoListsWorker);
}
mergeSaga(fetchTodoListsWatch);

function* fetchTodoListsWorker(): any {
  try {
    const result = yield call(fetchTodoLists);
    yield put(createAction(FETCH_TODO_LISTS_SUCCESS)(result));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(FETCH_TODO_LISTS_ERROR)(e));
  }
}

function fetchTodoLists() {
  return axiosApi('https://ds-apis.net/sandbox/todolists');
}

const actionReducerMap = {
  [FETCH_TODO_LISTS_SUCCESS]: (state, action) => {
    // console.log(action.type, action.isError, action.payload);
    const normalized = normalize(action.payload, [TodoListSchema]);
    const updated = { ...normalized.entities, allLists: normalized.result };
    return {
      ...state,
      ...updated,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  FETCH_TODO_LISTS,
  FETCH_TODO_LISTS_ERROR,
  FETCH_TODO_LISTS_SUCCESS,
  fetchTodoListsWatch,
  fetchTodoListsWorker,
  fetchTodoLists,
  actionReducerMap,
};
