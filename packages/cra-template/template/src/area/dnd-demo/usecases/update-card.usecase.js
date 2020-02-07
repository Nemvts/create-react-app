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
import { getCardsAction } from './get-cards.usecase';

const UPDATE_CARD: string = reducer.suffixKey('UPDATE_CARD');
export const updateCardAction = createAction(UPDATE_CARD);
const UPDATE_CARD_SUCCESS: string = reducer.suffixKey('UPDATE_CARD_SUCCESS');
const UPDATE_CARD_ERROR: string = reducer.suffixKey('UPDATE_CARD_ERROR');

function* updateCardWatch(): any {
  yield takeEvery(UPDATE_CARD, updateCardWorker);
}
mergeSaga(updateCardWatch);

function* updateCardWorker(action: any): any {
  try {
    console.log(action.type, 'call API'); // eslint-disable-line no-console
    const result = yield call(updateCard, action.payload);
    yield put(createAction(UPDATE_CARD_SUCCESS)(result));
  } catch (e) {
    yield call(showError, e);
    yield put(createAction(UPDATE_CARD_ERROR)(e));
  }
}

function updateCard(data: any) {
  return axiosApi(`${getAppSettings().globalApiUrl}/dnd-demo/cards`, {
    method: 'put',
    data,
  });
}

const actionReducerMap = {
  [UPDATE_CARD]: state => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [UPDATE_CARD_ERROR]: state => {
    return {
      ...state,
      isLoading: false,
    };
  },
  [UPDATE_CARD_SUCCESS]: (state, action) => {
    console.log(action.type); // eslint-disable-line no-console
    return {
      ...state,
      isLoading: false,
      users: action.payload,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

function* updateCardErrorWatch(): any {
  yield takeEvery(UPDATE_CARD_ERROR, updateCardErrorWorker);
}
mergeSaga(updateCardErrorWatch);

function* updateCardErrorWorker(): any {
  yield put(getCardsAction());
}

export const testPort = {
  UPDATE_CARD,
  UPDATE_CARD_ERROR,
  UPDATE_CARD_SUCCESS,
  updateCardWatch,
  updateCardWorker,
  updateCard,
  updateCardErrorWatch,
  updateCardErrorWorker,
  actionReducerMap,
};
