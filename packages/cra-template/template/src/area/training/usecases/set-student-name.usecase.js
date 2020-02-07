// @flow
import { createAction } from 'redux-actions';

import { reducer } from '../training.reducer';

const SET_STUDENT_NAME: string = reducer.suffixKey('SET_STUDENT_NAME');
export const setStudentNameAction = createAction(SET_STUDENT_NAME);

export const actionReducerMap = {
  [SET_STUDENT_NAME]: (state, action) => {
    return {
      ...state,
      studentName: action.payload,
    };
  },
};

reducer.addActionReducerMap(actionReducerMap);
