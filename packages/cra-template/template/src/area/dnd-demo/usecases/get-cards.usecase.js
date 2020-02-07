// @flow
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  axiosApi,
  getAppSettings,
  mergeSaga,
} from '@dealersocket/react-common';
import { showError } from 'shared/utils/show-errors';
import { reducer } from '../dnd-demo.reducer';

const GET_CARDS: string = reducer.suffixKey('GET_CARDS');
export const getCardsAction = createAction(GET_CARDS);
const GET_CARDS_SUCCESS: string = reducer.suffixKey('GET_CARDS_SUCCESS');
const GET_CARDS_ERROR: string = reducer.suffixKey('GET_CARDS_ERROR');

function* getCardsWatch(): any {
  yield takeEvery(GET_CARDS, getCardsWorker);
}
mergeSaga(getCardsWatch);

function* getCardsWorker(): any {
  try {
    const result = yield call(getCards);
    yield put(createAction(GET_CARDS_SUCCESS)(result));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(GET_CARDS_ERROR)(e));
  }
}

function getCards() {
  return axiosApi(`${getAppSettings().globalApiUrl}/dnd-demo/cards`);
}

const actionReducerMap = {
  [GET_CARDS]: state => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [GET_CARDS_ERROR]: state => {
    return {
      ...state,
      isLoading: false,
    };
  },
  [GET_CARDS_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      cards: action.payload,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  GET_CARDS,
  GET_CARDS_ERROR,
  GET_CARDS_SUCCESS,
  getCardsWatch,
  getCardsWorker,
  getCards,
  actionReducerMap,
};
