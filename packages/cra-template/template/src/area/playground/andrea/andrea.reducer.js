// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'andreaSlice';

const initialState = {
  calculations: null,
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
