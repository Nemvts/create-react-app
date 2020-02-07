// @flow
import { testPort } from './students-page.container';
import { sliceName } from '../state/dallas-class.reducer';

describe('students-page.container', () => {
  it('mapStateToProps', () => {
    const mockState = {
      [sliceName]: {
        filterCriteria: '',
        isBulkProcessing: false,
        isLoading: false,
        removingStudentIds: [],
        selectedStudentIds: [],
        students: null,
      },
    };
    const result = testPort.mapStateToProps(mockState);
    const expected = {
      filterCriteria: '',
      isBulkProcessing: false,
      isLoading: false,
      isOneSelected: false,
      students: null,
    };
    expect(result).toEqual(expected);
  });
});
