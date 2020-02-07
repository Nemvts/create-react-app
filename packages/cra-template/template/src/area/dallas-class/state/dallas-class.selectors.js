// @flow
import { createSelector } from 'reselect';
import { reducer } from './dallas-class.reducer';
import type { StudentType } from '../dallas-class.types';

const { sliceSelector } = reducer;

export const filterCriteriaSelector = createSelector(
  sliceSelector,
  slice => slice.filterCriteria
);

export const isBulkProcessingSelector = createSelector(
  sliceSelector,
  slice => slice.isBulkProcessing
);

export const isLoadingSelector = createSelector(
  sliceSelector,
  slice => slice.isLoading
);

const studentsSelector = createSelector(sliceSelector, slice => slice.students);

const selectedStudentIdsSelector = createSelector(
  sliceSelector,
  slice => slice.selectedStudentIds
);

export const removingStudentIdsSelector = createSelector(
  sliceSelector,
  slice => slice.removingStudentIds
);

export const foundStudentsSelector = createSelector(
  studentsSelector,
  filterCriteriaSelector,
  (students, criteria) => {
    if (!criteria || !students) {
      return students;
    }
    return students.filter(student =>
      isStudentMatch(student, criteria.toLowerCase())
    );
  }
);

function isStudentMatch(student: StudentType, criteria: string) {
  return (
    isStringMatch(student.first, criteria) ||
    isStringMatch(student.last, criteria) ||
    isStringMatch(student.ide, criteria) ||
    isStringMatch(student.language, criteria)
  );
}

function isStringMatch(value: string, criteria: string) {
  return value && value.toLowerCase().indexOf(criteria) !== -1;
}

export const selectedFoundStudentIdsSelector = createSelector(
  foundStudentsSelector,
  selectedStudentIdsSelector,
  (foundStudents, selectedStudentIds) => {
    return selectedStudentIds.filter(
      id =>
        foundStudents &&
        foundStudents.findIndex(student => student.id === id) !== -1
    );
  }
);

export const areAllFoundStudentsSelectedSelector = createSelector(
  foundStudentsSelector,
  selectedFoundStudentIdsSelector,
  (foundStudents, selectedFoundStudentIds) => {
    if (
      !foundStudents ||
      foundStudents.length === 0 ||
      selectedFoundStudentIds.length === 0
    ) {
      return false;
    }
    const isStudentUnselected = student => {
      return !selectedFoundStudentIds.includes(student.id);
    };
    const isOneUnselected = foundStudents.some(isStudentUnselected);
    return !isOneUnselected;
  }
);

export const isOneFoundStudentSelectedSelector = createSelector(
  foundStudentsSelector,
  selectedFoundStudentIdsSelector,
  (foundStudents, selectedFoundStudentIds) => {
    return selectedFoundStudentIds.length > 0;
  }
);
