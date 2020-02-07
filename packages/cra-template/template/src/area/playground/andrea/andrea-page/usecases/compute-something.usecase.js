// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { axiosApi, mergeSaga } from '@dealersocket/react-common';
import { showError } from 'shared/utils/show-errors';
import { reducer } from '../../andrea.reducer';

const COMPUTE_SOMETHING: string = reducer.suffixKey('COMPUTE_SOMETHING');
export const computeSomethingAction = createAction(COMPUTE_SOMETHING);

const COMPUTE_SOMETHING_ERROR: string = reducer.suffixKey(
  'COMPUTE_SOMETHING_ERROR'
);
const COMPUTE_SOMETHING_SUCCESS: string = reducer.suffixKey(
  'COMPUTE_SOMETHING_SUCCESS'
);

function* computeSomethingWatch(): any {
  yield takeEvery(COMPUTE_SOMETHING, computeSomethingWorker);
}
mergeSaga(computeSomethingWatch);

function* computeSomethingWorker(action: any): any {
  try {
    const data = action.payload;
    // data = {};
    const result = yield call(computeSomething, data);
    yield put(createAction(COMPUTE_SOMETHING_SUCCESS)(result));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(COMPUTE_SOMETHING_ERROR)(e));
  }
}

function computeSomething(data: any) {
  return axiosApi('https://myapis/compute-something', {
    method: 'post',
    data,
  });
}

const actionReducerMap = {
  [COMPUTE_SOMETHING]: state => {
    return {
      ...state,
      calculations: null,
    };
  },

  [COMPUTE_SOMETHING_ERROR]: state => {
    return state;
  },

  [COMPUTE_SOMETHING_SUCCESS]: (state, action) => {
    // console.log('COMPUTE_SOMETHING_SUCCESS', action.payload);
    return {
      ...state,
      calculations: action.payload.calculations,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  COMPUTE_SOMETHING,
  COMPUTE_SOMETHING_ERROR,
  COMPUTE_SOMETHING_SUCCESS,
  computeSomethingWatch,
  computeSomethingWorker,
  computeSomething,
  actionReducerMap,
};
