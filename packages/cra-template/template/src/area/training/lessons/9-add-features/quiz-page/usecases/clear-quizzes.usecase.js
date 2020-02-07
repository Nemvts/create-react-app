// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { showError } from 'shared/utils/show-errors';
import { axiosApi, mergeSaga } from '@dealersocket/react-common';
import { reducer } from '../../lesson9.reducer';

const CLEAR_QUIZZES: string = reducer.suffixKey('CLEAR_QUIZZES');
export const clearQuizzesAction = createAction(CLEAR_QUIZZES);
const CLEAR_QUIZZES_ERROR: string = reducer.suffixKey('CLEAR_QUIZZES_ERROR');
const CLEAR_QUIZZES_SUCCESS: string = reducer.suffixKey(
  'CLEAR_QUIZZES_SUCCESS'
);

function* clearQuizzesWatch(): any {
  yield takeEvery(CLEAR_QUIZZES, clearQuizzesWorker);
}
mergeSaga(clearQuizzesWatch);

function* clearQuizzesWorker(): any {
  try {
    const result = yield call(clearQuizzes);
    yield put(createAction(CLEAR_QUIZZES_SUCCESS)(result));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(CLEAR_QUIZZES_ERROR)(e));
  }
}

function clearQuizzes() {
  return axiosApi(`https://ds-apis.net/training9/quizzes`, {
    method: 'delete',
  });
}

const actionReducerMap = {
  [CLEAR_QUIZZES]: state => {
    return {
      ...state,
      isBusy: true,
    };
  },

  [CLEAR_QUIZZES_ERROR]: state => {
    return {
      ...state,
      isBusy: false,
    };
  },

  [CLEAR_QUIZZES_SUCCESS]: state => {
    // console.log('reduce', state, action); // eslint-disable-line no-console
    return {
      ...state,
      isBusy: false,
      quizzes: [],
      selectedQuizId: null,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  CLEAR_QUIZZES,
  CLEAR_QUIZZES_ERROR,
  CLEAR_QUIZZES_SUCCESS,
  clearQuizzesWatch,
  clearQuizzesWorker,
  clearQuizzes,
  actionReducerMap,
};
