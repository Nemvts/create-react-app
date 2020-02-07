// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { showError } from 'shared/utils/show-errors';
import { axiosApi, mergeSaga } from '@dealersocket/react-common';
import { reducer } from '../../lesson9.reducer';

const ADD_QUIZ: string = reducer.suffixKey('ADD_QUIZ');
export const addQuizAction = createAction(ADD_QUIZ);
const ADD_QUIZ_SUCCESS: string = reducer.suffixKey('ADD_QUIZ_SUCCESS');
const ADD_QUIZ_ERROR: string = reducer.suffixKey('ADD_QUIZ_ERROR');

function* addQuizWatch(): any {
  yield takeEvery(ADD_QUIZ, addQuizWorker);
}
mergeSaga(addQuizWatch);

function* addQuizWorker(action: any): any {
  try {
    const result = yield call(addQuiz, action.payload);
    yield put(createAction(ADD_QUIZ_SUCCESS)(result));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(ADD_QUIZ_ERROR)(e));
  }
}

function addQuiz(quiz: any) {
  return axiosApi(`https://ds-apis.net/training9/quizzes`, {
    method: 'put',
    data: quiz,
  });
}

const actionReducerMap = {
  [ADD_QUIZ_SUCCESS]: (state, action) => {
    console.log('reduce', state, action); // eslint-disable-line no-console
    const newQuiz = action.payload;
    return {
      ...state,
      quizzes: state.quizzes.concat(newQuiz),
      selectedQuizId: newQuiz.id,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  ADD_QUIZ,
  ADD_QUIZ_ERROR,
  ADD_QUIZ_SUCCESS,
  addQuizWatch,
  addQuizWorker,
  addQuiz,
  actionReducerMap,
};
