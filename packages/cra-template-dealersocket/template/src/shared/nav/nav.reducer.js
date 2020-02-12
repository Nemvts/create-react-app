// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'nav';

const initialState = {
  title: 'Home',
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
