// @flow
import { createAction } from 'redux-actions';
import { usageReducer } from '../usage.reducer';

const SET_ORDER_BY: string = usageReducer.suffixKey('SET_ORDER_BY');
export const setOrderByAction = createAction(SET_ORDER_BY);

const actionReducerMap = {
  [SET_ORDER_BY]: (slice, action) => {
    const orderBy = action.payload;
    let order = 'desc';

    if (slice.orderBy === orderBy && slice.order === 'desc') {
      order = 'asc';
    }

    return {
      ...slice,
      order,
      orderBy,
    };
  },
};
usageReducer.addActionReducerMap(actionReducerMap);
