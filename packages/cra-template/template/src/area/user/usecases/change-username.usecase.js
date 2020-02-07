// @flow
import { createAction } from 'redux-actions';
import { takeLatest, put } from 'redux-saga/effects';
import { mergeSaga } from '@dealersocket/react-common';
import { loadReposDebouncedAction } from 'area/github-explorer/explorer-page/usecases/load-repos-debounced.usecase';
import { reducer } from '../user.reducer';

const CHANGE_USERNAME: string = reducer.suffixKey('CHANGE_USERNAME');
export const changeUsernameAction = createAction(CHANGE_USERNAME);

function* changeUserWatch(): any {
  yield takeLatest(CHANGE_USERNAME, changeUserWorker);
}
mergeSaga(changeUserWatch);

function* changeUserWorker(): any {
  yield put(loadReposDebouncedAction());
}

export const actionReducerMap = {
  [CHANGE_USERNAME]: (state, action) => {
    // Delete prefixed '@' from the github username
    const username = action.payload.replace(/@/gi, '');
    return {
      ...state,
      username,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  CHANGE_USERNAME,
  changeUserWatch,
  changeUserWorker,
  actionReducerMap,
};
