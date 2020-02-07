// @flow
import { createAction } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { showError } from 'shared/utils/show-errors';
import { axiosApi, mergeSaga } from '@dealersocket/react-common';
import { reducer } from '../lesson8.reducer';

const COMPUTE: string = reducer.suffixKey('COMPUTE');
export const computeAction = createAction(COMPUTE);
const COMPUTE_ERROR: string = reducer.suffixKey('COMPUTE_ERROR');
const COMPUTE_SUCCESS: string = reducer.suffixKey('COMPUTE_SUCCESS');

function* computeWatch(): any {
  yield takeEvery(COMPUTE, computeWorker);
}
mergeSaga(computeWatch);

function* computeWorker(action: any): any {
  const state = yield select();
  console.log('after reduce COMPUTE', state.lesson8); // eslint-disable-line no-console
  try {
    const result = yield call(compute, action.payload);
    yield put(createAction(COMPUTE_SUCCESS)(result));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(COMPUTE_ERROR)(e));
  }
}

function compute(data: any) {
  console.log('posting to https://ds-apis.net/training/quiz/compute'); // eslint-disable-line no-console
  return axiosApi(`https://ds-apis.net/training/quiz/compute`, {
    method: 'post',
    data,
  });
}

const actionReducerMap = {
  [COMPUTE]: (state, action) => {
    console.log('reduce COMPUTE', state, action); // eslint-disable-line no-console
    return {
      ...state,
      isComputing: true,
      result: '',
    };
  },
  [COMPUTE_ERROR]: (state, action) => {
    console.log('reduce COMPUTE_ERROR:', state, action); // eslint-disable-line no-console
    return {
      ...state,
      isComputing: false,
      result: 'Err!',
    };
  },
  [COMPUTE_SUCCESS]: (state, action) => {
    console.log('reduce COMPUTE_SUCCESS:', state, action); // eslint-disable-line no-console
    const result = action.payload.value;
    return {
      ...state,
      isComputing: false,
      result,
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
