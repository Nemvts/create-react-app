// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { axiosApi, mergeSaga } from '@dealersocket/react-common';
import { showError } from 'shared/utils/show-errors';
import { reducer } from '../../lesson9.reducer';

const RESET_QUIZZES: string = reducer.suffixKey('RESET_QUIZZES');
export const resetQuizzesAction = createAction(RESET_QUIZZES);
const RESET_QUIZZES_SUCCESS: string = reducer.suffixKey(
  'RESET_QUIZZES_SUCCESS'
);
const RESET_QUIZZES_ERROR: string = reducer.suffixKey('RESET_QUIZZES_ERROR');

function* resetQuizzesWatch(): any {
  yield takeEvery(RESET_QUIZZES, resetQuizzesWorker);
}
mergeSaga(resetQuizzesWatch);

function* resetQuizzesWorker(): any {
  try {
    const result = yield call(resetQuizzes);
    yield put(createAction(RESET_QUIZZES_SUCCESS)(result));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(RESET_QUIZZES_ERROR)(e));
  }
}

function resetQuizzes() {
  return axiosApi('https://ds-apis.net/training9/quizzes/reset');
}

const actionReducerMap = {
  [RESET_QUIZZES]: state => {
    return {
      ...state,
      isBusy: true,
    };
  },

  [RESET_QUIZZES_ERROR]: state => {
    return {
      ...state,
      isBusy: true,
    };
  },

  [RESET_QUIZZES_SUCCESS]: (state, action) => {
    console.log('reduce', state, action); // eslint-disable-line no-console
    return {
      ...state,
      isBusy: false,
      quizzes: action.payload,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  RESET_QUIZZES,
  RESET_QUIZZES_ERROR,
  RESET_QUIZZES_SUCCESS,
  resetQuizzesWatch,
  resetQuizzesWorker,
  resetQuizzes,
  actionReducerMap,
};
