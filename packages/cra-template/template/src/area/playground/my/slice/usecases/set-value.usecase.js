// @flow
import { createAction } from 'redux-actions';
import { myReducer } from '../my.reducer';

const SET_VALUE: string = myReducer.suffixKey('SET_VALUE');
export const setValueAction = createAction(SET_VALUE);

const actionReducerMap = {
  [SET_VALUE]: (state, action) => {
    return {
      ...state,
      value: action.payload,
    };
  },
};
myReducer.addActionReducerMap(actionReducerMap);
