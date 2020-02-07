// @flow
import { createAction } from 'redux-actions';
import { delay, put, select, takeLatest } from 'redux-saga/effects';
import { mergeSaga } from '@dealersocket/react-common';
import { reducer } from '../../explorer.reducer';
import { usernameSelector } from '../../../user/user.selectors';
import { currentUserSelector } from '../../explorer.selectors';
import { loadReposAction } from './load-repos.usecase';

export const LOAD_REPOS_DEBOUNCED: string = reducer.suffixKey(
  'LOAD_REPOS_DEBOUNCED'
);
export const loadReposDebouncedAction = createAction(LOAD_REPOS_DEBOUNCED);

function* loadReposDebouncedWatch(): any {
  yield takeLatest(LOAD_REPOS_DEBOUNCED, loadReposDebouncedWorker);
}
mergeSaga(loadReposDebouncedWatch);

function* loadReposDebouncedWorker(): any {
  // debounce by 1s
  yield delay(1000);
  const username = yield select(usernameSelector);
  const currentUser = yield select(currentUserSelector);
  if (username !== currentUser) {
    yield put(loadReposAction());
  }
}

export const testPort = {
  loadReposDebouncedWatch,
  loadReposDebouncedWorker,
};
