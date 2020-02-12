// @flow
import { createAction } from 'redux-actions';

import { reducer } from '../../language.reducer';

export const CHANGE_LOCALE: string = reducer.suffixKey('CHANGE_LOCALE');
export const changeLocaleAction = createAction(CHANGE_LOCALE);

export const actionReducerMap = {
  [CHANGE_LOCALE]: (state, action) => {
    return {
      ...state,
      locale: action.payload,
    };
  },
};

reducer.addActionReducerMap(actionReducerMap);
