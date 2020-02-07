// @flow
import { createAction } from 'redux-actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { axiosApi, mergeSaga } from '@dealersocket/react-common';
import { showError } from 'shared/utils/show-errors';
import { reducer } from '../author.reducer';
import { authorsSelector } from '../author.selectors';

const LOAD_AUTHORS: string = reducer.suffixKey('LOAD_AUTHORS');
export const loadAuthorsAction = createAction(LOAD_AUTHORS);
const LOAD_AUTHORS_SUCCESS: string = reducer.suffixKey('LOAD_AUTHORS_SUCCESS');
const LOAD_AUTHORS_ERROR: string = reducer.suffixKey('LOAD_AUTHORS_ERROR');

function* loadAuthorsWatch(): any {
  yield takeLatest(LOAD_AUTHORS, loadAuthorsWorker);
}
mergeSaga(loadAuthorsWatch);

function* loadAuthorsWorker(): any {
  const authors = yield select(authorsSelector);
  if (authors && authors.length) {
    return;
  }
  try {
    const result = yield call(loadAuthors);
    yield put(createAction(LOAD_AUTHORS_SUCCESS)(result));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(LOAD_AUTHORS_ERROR)(e));
  }
}

function loadAuthors(): Promise<any> {
  return axiosApi('https://ds-apis.net/sandbox/authors');
}

const actionReducerMap = {
  [LOAD_AUTHORS]: state => {
    // console.log('LOAD_AUTHORS');
    return state;
  },
  [LOAD_AUTHORS_SUCCESS]: (state, action) => {
    // console.log(action.type, action.payload);
    return {
      ...state,
      authors: action.payload,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  LOAD_AUTHORS,
  LOAD_AUTHORS_ERROR,
  LOAD_AUTHORS_SUCCESS,
  loadAuthorsWatch,
  loadAuthorsWorker,
  loadAuthors,
  actionReducerMap,
};
