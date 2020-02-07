// @flow
import { createSelector } from 'reselect';
import { reducer } from './course.reducer';

const { sliceSelector } = reducer;

export const coursesSelector = createSelector(
  sliceSelector,
  slice => slice.courses
);

const courseEditIdSelector = createSelector(
  sliceSelector,
  slice => slice.selectedCourseId
);

const courseEditOriginalSelector = createSelector(
  coursesSelector,
  courseEditIdSelector,
  (courses, editCourseId) => {
    const result = courses && courses.find(c => c.id === editCourseId);
    // console.log('courseEditOriginalSelector =', courses, editCourseId, result);
    return result;
  }
);

export const courseEditCloneSelector = createSelector(
  coursesSelector,
  courseEditIdSelector,
  courseEditOriginalSelector,
  (courses, editCourseId, original) => {
    let clone = null;
    if (!courses || editCourseId == null) {
      return clone;
    }
    if (original) {
      clone = { ...original };
      // console.log('cloned course', clone);
      return clone;
    }
    clone = {
      id: '',
      watchHref: '',
      title: '',
      authorId: '',
      length: '',
      category: '',
    };
    // console.log('new course template', clone);
    return clone;
  }
);
