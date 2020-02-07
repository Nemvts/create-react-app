// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'user';

const initialState = {
  username: '',
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
