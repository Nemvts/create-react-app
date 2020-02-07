// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'explorerSlice';

const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: null,
  },
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
