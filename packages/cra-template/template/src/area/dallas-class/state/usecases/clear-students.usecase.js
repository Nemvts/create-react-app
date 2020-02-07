// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../dallas-class.reducer';

const CLEAR_STUDENTS: string = reducer.suffixKey('CLEAR_STUDENTS');
export const clearStudentsAction = createAction(CLEAR_STUDENTS);

const actionReducerMap = {
  [CLEAR_STUDENTS]: slice => {
    return {
      ...slice,
      students: null,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  CLEAR_STUDENTS,
  actionReducerMap,
};
