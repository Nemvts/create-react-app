// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';

const sliceName = 'dndDemo';

const initialState = {
  cards: [],
  draggedItem: undefined,
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
