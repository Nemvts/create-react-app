// @flow
import { sliceName } from './dallas-class.reducer';
import type { DallasClassSliceType } from './dallas-class.reducer';
import * as selectors from './dallas-class.selectors';
import students from '../mock/dallas-students.json';

describe('dallas-class.selectors', () => {
  const createState = sliceOverrides => {
    const slice: DallasClassSliceType = {
      filterCriteria: '',
      isBulkProcessing: false,
      isLoading: false,
      removingStudentIds: [],
      selectedStudentIds: [],
      students,
    };
    return {
      [sliceName]: {
        ...slice,
        ...sliceOverrides,
      },
    };
  };

  it('filterCriteriaSelector', () => {
    const filterCriteria = 'abc';
    const state = createState({ filterCriteria });
    expect(selectors.filterCriteriaSelector(state)).toEqual(filterCriteria);
  });

  it('isBulkProcessingSelector', () => {
    const isBulkProcessing = true;
    const state = createState({ isBulkProcessing });
    expect(selectors.isBulkProcessingSelector(state)).toEqual(isBulkProcessing);
  });

  it('isLoadingSelector', () => {
    const isLoading = true;
    const state = createState({ isLoading });
    expect(selectors.isLoadingSelector(state)).toEqual(isLoading);
  });

  it('removingStudentIdsSelector', () => {
    const removingStudentIds = [2, 4, 7];
    const state = createState({ removingStudentIds });
    expect(selectors.removingStudentIdsSelector(state)).toEqual(
      removingStudentIds
    );
  });

  it('foundStudentsSelector with no students', () => {
    const state = createState({ students: null });
    expect(selectors.foundStudentsSelector(state)).toEqual(null);
  });

  it('foundStudentsSelector with no filterCriteria', () => {
    const state = createState({ filterCriteria: '' });
    expect(selectors.foundStudentsSelector(state)).toEqual(students);
  });

  it('foundStudentsSelector with filterCriteria', () => {
    const state = createState({ filterCriteria: 'es' });
    expect(selectors.foundStudentsSelector(state)).toEqual([
      students[0],
      students[3],
      students[4],
      students[16],
    ]);
  });

  it('selectedFoundStudentIdsSelector with no filterCriteria', () => {
    const state = createState({
      filterCriteria: '',
      selectedStudentIds: [1, 2, 3],
    });
    expect(selectors.selectedFoundStudentIdsSelector(state)).toEqual([1, 2, 3]);
  });

  it('selectedFoundStudentIdsSelector with filterCriteria', () => {
    const state = createState({
      filterCriteria: 'es',
      selectedStudentIds: [1, 2, 3],
    });
    expect(selectors.selectedFoundStudentIdsSelector(state)).toEqual([1]);
  });

  it('areAllFoundStudentsSelectedSelector false', () => {
    const state = createState();
    expect(selectors.areAllFoundStudentsSelectedSelector(state)).toEqual(false);
  });

  it('areAllFoundStudentsSelectedSelector true', () => {
    const state = createState({
      filterCriteria: 'es',
      selectedStudentIds: [1, 4, 5, 17],
    });
    expect(selectors.areAllFoundStudentsSelectedSelector(state)).toEqual(true);
  });

  it('isOneFoundStudentSelectedSelector false', () => {
    const state = createState();
    expect(selectors.isOneFoundStudentSelectedSelector(state)).toEqual(false);
  });

  it('isOneFoundStudentSelectedSelector true', () => {
    const state = createState({
      filterCriteria: 'es',
      selectedStudentIds: [1, 2, 3],
    });
    expect(selectors.isOneFoundStudentSelectedSelector(state)).toEqual(true);
  });
});
