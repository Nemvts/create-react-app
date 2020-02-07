// @flow
import { createAction } from 'redux-actions';
import { reducer } from '../../course.reducer';

const SELECT_COURSE_ID: string = reducer.suffixKey('SELECT_COURSE_ID');
export const selectCourseIdAction = createAction(SELECT_COURSE_ID);

const actionReducerMap = {
  [SELECT_COURSE_ID]: (state, action) => {
    return {
      ...state,
      selectedCourseId: action.payload,
    };
  },
};
reducer.addActionReducerMap(actionReducerMap);

export const testPort = {
  SELECT_COURSE_ID,
  actionReducerMap,
};
