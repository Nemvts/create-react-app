// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { showError } from 'shared/utils/show-errors';
import { axiosApi, mergeSaga } from '@dealersocket/react-common';
import { reducer } from '../../lesson9.reducer';

const REMOVE_QUIZ: string = reducer.suffixKey('REMOVE_QUIZ');
export const removeQuizAction = createAction(REMOVE_QUIZ);
const REMOVE_QUIZ_ERROR: string = reducer.suffixKey('REMOVE_QUIZ_ERROR');
const REMOVE_QUIZ_SUCCESS: string = reducer.suffixKey('REMOVE_QUIZ_SUCCESS');

function* removeQuizWatch(): any {
  yield takeEvery(REMOVE_QUIZ, removeQuizWorker);
}
mergeSaga(removeQuizWatch);

function* removeQuizWorker(action: any): any {
  try {
    const quizId = action.payload;
    const result = yield call(removeQuiz, quizId);
    yield put(
      createAction(REMOVE_QUIZ_SUCCESS)({
        quizId,
        result,
      })
    );
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(REMOVE_QUIZ_ERROR)(e));
  }
}

function removeQuiz(quizId: string) {
  return axiosApi(`https://ds-apis.net/training9/quizzes/${quizId}`, {
    method: 'delete',
  });
}

const actionReducerMap = {
  [REMOVE_QUIZ]: state => {
    return {
      ...state,
      isBusy: true,
    };
  },

  [REMOVE_QUIZ_ERROR]: state => {
    return {
      ...state,
      isBusy: false,
    };
  },

  [REMOVE_QUIZ_SUCCESS]: (state, action) => {
    // console.log('reduce', state, action); // eslint-disable-line no-console
    const quizIdRemoved = action.payload.quizId;
    const quizzes = state.quizzes.filter(quiz => quiz.id !== quizIdRemoved);
    return {
      ...state,
      isBusy: false,
      selectedQuizId: null,
      quizzes,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  REMOVE_QUIZ,
  REMOVE_QUIZ_ERROR,
  REMOVE_QUIZ_SUCCESS,
  removeQuizWatch,
  removeQuizWorker,
  removeQuiz,
  actionReducerMap,
};
