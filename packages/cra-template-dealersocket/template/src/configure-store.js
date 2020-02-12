// @flow
/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
// import { createLogicMiddleware } from 'redux-logic';
import createSagaMiddleware from 'redux-saga';
import {
  // initMergeLogic,
  initMergeSaga,
  storeHelper,
} from '@dealersocket/react-common';

import { createRootReducer } from './create-root-reducer';

export function configureStore(
  initialState: any,
  history: any
  // injectedHelpers: any = {}
) {
  // inject helpers, are available to all logic
  // const logicMiddleware = createLogicMiddleware([], injectedHelpers);

  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // Create the store with two middlewares
  // 1. routerMiddleware: Syncs the location/URL path to the state
  // 2. sagaMiddleware: enables redux-saga
  const middlewares = [
    // logicMiddleware,
    routerMiddleware(history),
    sagaMiddleware,
  ];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  /* eslint-enable */

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );
  // Extensions
  store.asyncReducers = {}; // Async reducer registry
  // store.logicMiddleware = logicMiddleware;
  store.sagaMiddleware = sagaMiddleware;

  // Make create-root-reducer hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./create-root-reducer', () => {
      import('./create-root-reducer').then(createRootReducerModule => {
        const newRootReducer = createRootReducerModule.createRootReducer(
          store.asyncReducers
        );
        store.replaceReducer(newRootReducer);
      });
    });
  }

  // initMergeLogic(logicMiddleware);
  initMergeSaga(sagaMiddleware);
  storeHelper.init(store, createRootReducer);

  return store;
}
