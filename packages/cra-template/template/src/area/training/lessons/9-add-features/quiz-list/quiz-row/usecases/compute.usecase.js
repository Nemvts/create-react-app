// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { showError } from 'shared/utils/show-errors';
import { axiosApi, mergeSaga } from '@dealersocket/react-common';
import { reducer } from '../../../lesson9.reducer';

const COMPUTE: string = reducer.suffixKey('COMPUTE');
export const computeAction = createAction(COMPUTE);
const COMPUTE_ERROR: string = reducer.suffixKey('COMPUTE_ERROR');
const COMPUTE_SUCCESS: string = reducer.suffixKey('COMPUTE_SUCCESS');

function* computeWatch(): any {
  yield takeEvery(COMPUTE, computeWorker);
}
mergeSaga(computeWatch);

function* computeWorker(action: any): any {
  const { quiz, update } = action.payload;
  const quizId = quiz.id;
  // prepare data
  const data = {
    quizId,
    operand1: quiz.operand1,
    operand2: quiz.operand2,
    operation: quiz.operation,
  };
  try {
    const result = yield call(compute, data);
    yield put(
      createAction(COMPUTE_SUCCESS)({
        quizId,
        update,
        result: result.value,
      })
    );
  } catch (e) {
    yield call(showError, e);
    yield put(
      createAction(COMPUTE_ERROR)({
        quizId,
      })
    );
  }
}

function compute(data: any) {
  return axiosApi(`https://ds-apis.net/training9/quiz/compute`, {
    method: 'post',
    data,
  });
}

const actionReducerMap = {
  [COMPUTE]: (state, action) => {
    // console.log('reduce COMPUTE:', state, action); // eslint-disable-line no-console
    const quizId = action.payload.quiz.id;
    const quizReducer = quiz => {
      return quiz.id === quizId
        ? {
            ...quiz,
            isComputing: true,
            expectedResult: null,
          }
        : quiz;
    };

    return {
      ...state,
      quizzes: state.quizzes.map(quizReducer),
    };
  },

  [COMPUTE_ERROR]: (state, action) => {
    console.log('reduce COMPUTE_ERROR:', state, action); // eslint-disable-line no-console
    const { quizId } = action.payload;

    const quizReducer = quiz => {
      return quiz.id === quizId
        ? {
            ...quiz,
            isComputing: false,
            result: null,
          }
        : quiz;
    };
    return {
      ...state,
      quizzes: state.quizzes.map(quizReducer),
    };
  },

  [COMPUTE_SUCCESS]: (state, action) => {
    console.log('reduce COMPUTE_SUCCESS:', state, action); // eslint-disable-line no-console
    const { quizId } = action.payload;
    const { update } = action.payload;
    const { result } = action.payload;

    const quizReducer = quiz => {
      return quiz.id === quizId
        ? {
            ...quiz,
            isComputing: false,
            expectedResult: result,
            result: update ? result : quiz.result,
          }
        : quiz;
    };

    return {
      ...state,
      quizzes: state.quizzes.map(quizReducer),
    };
  },
};

reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  COMPUTE,
  COMPUTE_ERROR,
  COMPUTE_SUCCESS,
  computeWatch,
  computeWorker,
  compute,
  actionReducerMap,
};
