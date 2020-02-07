// @flow
import { createAndMergeSliceReducer } from '@dealersocket/react-common';
import type { StudentType } from '../dallas-class.types';

export const sliceName = 'dallasClassSlice';

export type DallasClassSliceType = {
  filterCriteria: string,
  isBulkProcessing: boolean,
  isLoading: boolean,
  removingStudentIds: number[],
  selectedStudentIds: number[],
  students: null | StudentType[],
};

const initialState: DallasClassSliceType = {
  filterCriteria: '',
  isBulkProcessing: false,
  isLoading: false,
  removingStudentIds: [],
  selectedStudentIds: [],
  students: null,
};

export const reducer = createAndMergeSliceReducer(sliceName, initialState);
