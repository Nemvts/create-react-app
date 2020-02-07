// @flow
import { createAction } from 'redux-actions';
import { call, select, takeLatest, put } from 'redux-saga/effects';
import { mergeSaga, axiosJson } from '@dealersocket/react-common';
import { usernameSelector } from 'area/user/user.selectors';
import { showError } from 'shared/utils/show-errors';
import { reducer } from '../../explorer.reducer';
import { clearReposAction } from './clear-repos.usecase';

export const LOAD_REPOS: string = reducer.suffixKey('LOAD_REPOS');
export const loadReposAction = createAction(LOAD_REPOS);
export const LOAD_REPOS_SUCCESS: string = reducer.suffixKey(
  'LOAD_REPOS_SUCCESS'
);
export const LOAD_REPOS_ERROR: string = reducer.suffixKey('LOAD_REPOS_ERROR');

function* loadReposWatch(): any {
  yield takeLatest(LOAD_REPOS, loadReposWorker);
}
mergeSaga(loadReposWatch);

function* loadReposWorker(): any {
  const username = yield select(usernameSelector);
  if (!username) {
    yield put(clearReposAction());
    return;
  }
  try {
    const repos = yield call(getRepos, username);
    yield put(createAction(LOAD_REPOS_SUCCESS)({ repos, username }));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(LOAD_REPOS_ERROR)(e));
  }
}

function getRepos(username: string) {
  const requestURL = `https://api.github.com/users/${username}/repos`;
  const params = {
    type: 'all',
    sort: 'updated',
  };
  return axiosJson(requestURL, { params });
}

const actionReducerMap = {
  [LOAD_REPOS]: state => {
    return {
      ...state,
      loading: true,
      error: false,
      userData: {
        repositories: null,
      },
    };
  },

  [LOAD_REPOS_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      currentUser: action.payload.username,
      userData: {
        repositories: action.payload.repos,
      },
    };
  },

  [LOAD_REPOS_ERROR]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  loadReposWatch,
  loadReposWorker,
  getRepos,
  actionReducerMap,
};
