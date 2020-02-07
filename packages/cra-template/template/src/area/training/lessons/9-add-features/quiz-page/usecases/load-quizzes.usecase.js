// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { showError } from 'shared/utils/show-errors';
import { axiosApi, mergeSaga } from '@dealersocket/react-common';
import { reducer } from '../../lesson9.reducer';

const LOAD_QUIZZES: string = reducer.suffixKey('LOAD_QUIZZES');
export const loadQuizzesAction = createAction(LOAD_QUIZZES);
const LOAD_QUIZZES_ERROR: string = reducer.suffixKey('LOAD_QUIZZES_ERROR');
const LOAD_QUIZZES_SUCCESS: string = reducer.suffixKey('LOAD_QUIZZES_SUCCESS');

function* loadQuizzesWatch(): any {
  yield takeEvery(LOAD_QUIZZES, loadQuizzesWorker);
}
mergeSaga(loadQuizzesWatch);

function* loadQuizzesWorker(): any {
  try {
    const result = yield call(loadQuizzes);
    yield put(createAction(LOAD_QUIZZES_SUCCESS)(result));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(LOAD_QUIZZES_ERROR)(e));
  }
}

function loadQuizzes() {
  return axiosApi(`https://ds-apis.net/training9/quizzes`);
}

const actionReducerMap = {
  [LOAD_QUIZZES]: state => {
    return {
      ...state,
      isBusy: true,
    };
  },

  [LOAD_QUIZZES_ERROR]: state => {
    return {
      ...state,
      isBusy: false,
    };
  },

  [LOAD_QUIZZES_SUCCESS]: (state, action) => {
    // console.log('reduce', state, action); // eslint-disable-line no-console
    return {
      ...state,
      isBusy: false,
      quizzes: action.payload,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  LOAD_QUIZZES,
  LOAD_QUIZZES_ERROR,
  LOAD_QUIZZES_SUCCESS,
  loadQuizzesWatch,
  loadQuizzesWorker,
  loadQuizzes,
  actionReducerMap,
};
