// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'todoSlice';

const initialState = {
  allLists: [],
  todoLists: {},
  todoItems: {},
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
