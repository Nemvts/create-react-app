// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../../explorer.reducer';

export const CLEAR_REPOS: string = reducer.suffixKey('CLEAR_REPOS');
export const clearReposAction = createAction(CLEAR_REPOS);

const actionReducerMap = {
  [CLEAR_REPOS]: state => {
    return {
      ...state,
      loading: false,
      error: false,
      userData: {
        repositories: null,
      },
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  actionReducerMap,
};
