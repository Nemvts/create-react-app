// @flow
import { connect } from 'react-redux';
import { StudentTable } from './student-table.component';
import {
  areAllFoundStudentsSelectedSelector,
  filterCriteriaSelector,
  isBulkProcessingSelector,
  removingStudentIdsSelector,
  selectedFoundStudentIdsSelector,
} from '../../state/dallas-class.selectors';
import { removeStudentAction } from '../../state/usecases/remove-student.usecase';
import { toggleStudentAction } from '../../state/usecases/toggle-student.usecase';
import { toggleStudentsAction } from '../../state/usecases/toggle-students.usecase';

function mapStateToProps(state: any) {
  return {
    areAllSelected: areAllFoundStudentsSelectedSelector(state),
    filterCriteria: filterCriteriaSelector(state),
    isBulkProcessing: isBulkProcessingSelector(state),
    removingStudentIds: removingStudentIdsSelector(state),
    selectedStudentIds: selectedFoundStudentIdsSelector(state),
  };
}

const mapDispatchToProps = {
  removeStudentAction,
  toggleStudentAction,
  toggleStudentsAction,
};

export const StudentTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTable);

export const testPort = {
  mapStateToProps,
};
