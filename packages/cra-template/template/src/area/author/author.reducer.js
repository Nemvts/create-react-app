// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'authorSlice';

const initialState = {
  authors: null,
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
