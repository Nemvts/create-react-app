// @flow
import { testPort } from './student-table.container';
import { sliceName } from '../../state/dallas-class.reducer';

describe('students-table.container', () => {
  it('mapStateToProps', () => {
    const mockState = {
      [sliceName]: {
        areAllSelected: false,
        filterCriteria: '',
        isBulkProcessing: false,
        removingStudentIds: [],
        selectedStudentIds: [],
      },
    };
    const result = testPort.mapStateToProps(mockState);
    const expected = {
      areAllSelected: false,
      filterCriteria: '',
      isBulkProcessing: false,
      removingStudentIds: [],
      selectedStudentIds: [],
    };
    expect(result).toEqual(expected);
  });
});
