// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'trainingSlice';

const initialState = {
  studentName: '',
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
