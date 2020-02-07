// @flow
import { createAction } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import { mergeSaga } from '@dealersocket/react-common';
import { computeAction } from './compute.usecase';
import { reducer } from '../../../lesson9.reducer';

const SET_RESULT: string = reducer.suffixKey('SET_RESULT');
export const setResultAction = createAction(SET_RESULT);

function* setResultWatch(): any {
  yield takeEvery(SET_RESULT, setResultWorker);
}
mergeSaga(setResultWatch);

function* setResultWorker(action: any): any {
  const { quiz } = action.payload;
  console.log('process SET_RESULT'); // eslint-disable-line no-console
  if (!quiz.expectedResult && !quiz.isComputing) {
    yield put(computeAction({ quiz, update: false }));
  }
}

const actionReducerMap = {
  [SET_RESULT]: (state, action) => {
    console.log('reduce SET_RESULT', state, action); // eslint-disable-line no-console
    const numValue = parseInt(action.payload.value, 10);
    const result = Number.isNaN(numValue) ? '' : numValue; // eslint-disable-line no-param-reassign

    const quizReducer = quiz => {
      if (quiz.id === action.payload.quiz.id) {
        return {
          ...quiz,
          result,
        };
      }
      return quiz;
    };

    return {
      ...state,
      quizzes: state.quizzes.map(quizReducer),
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  SET_RESULT,
  setResultWatch,
  setResultWorker,
  actionReducerMap,
};
