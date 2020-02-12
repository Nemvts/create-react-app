// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import { commonReducers, getHistory } from '@dealersocket/react-common';
import { reducer as toastrReducer } from 'react-redux-toastr';

/**
 * Creates the root reducer by combining the static topReducers
 * with the asynchronously loaded ones.
 * Note: If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
export function createRootReducer(asyncTopReducers: any) {
  let topReducers = {
    form: formReducer,
    toastr: toastrReducer,
    ...commonReducers,
    ...asyncTopReducers,
  };

  const history = getHistory();
  if (history) {
    topReducers = {
      // 'router' key required by 'connected-react-router'
      router: connectRouter(history),
      ...topReducers,
    };
  }

  return combineReducers(topReducers);
}
