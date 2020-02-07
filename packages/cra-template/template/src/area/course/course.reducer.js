// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'courseSlice';

const initialState = {
  courses: null,
  selectedCourseId: null,
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
