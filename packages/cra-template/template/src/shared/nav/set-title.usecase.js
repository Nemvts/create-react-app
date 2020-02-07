// @flow
import { createAction } from 'redux-actions';
import { reducer } from './nav.reducer';

const SET_NAV_TITLE: string = reducer.suffixKey('SET_NAV_TITLE');
export const setNavTitleAction = createAction(SET_NAV_TITLE);

export const actionReducerMap = {
  [SET_NAV_TITLE]: (state, action) => {
    if (state.title !== action.payload) {
      return {
        ...state,
        title: action.payload,
      };
    }
    return state;
  },
};

reducer.addActionReducerMap(actionReducerMap);
