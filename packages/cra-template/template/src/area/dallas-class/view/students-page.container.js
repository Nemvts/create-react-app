// @flow
import { connect } from 'react-redux';
import {
  filterCriteriaSelector,
  foundStudentsSelector,
  isBulkProcessingSelector,
  isLoadingSelector,
  isOneFoundStudentSelectedSelector,
} from '../state/dallas-class.selectors';
import { StudentsPageComp } from './students-page.component';
import { clearStudentsAction } from '../state/usecases/clear-students.usecase';
import { loadStudentsAction } from '../state/usecases/load-students.usecase';
import { removeSelectedStudentsAction } from '../state/usecases/remove-selected-students.usecase';
import { setFilterCriteriaAction } from '../state/usecases/set-filter-criteria.usecase';

function mapStateToProps(state: any) {
  return {
    filterCriteria: filterCriteriaSelector(state),
    isBulkProcessing: isBulkProcessingSelector(state),
    isLoading: isLoadingSelector(state),
    isOneSelected: isOneFoundStudentSelectedSelector(state),
    students: foundStudentsSelector(state),
  };
}

const mapDispatchToProps = {
  clearStudentsAction,
  loadStudentsAction,
  removeSelectedStudentsAction,
  setFilterCriteriaAction,
};

export const StudentsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsPageComp);

export const testPort = {
  mapStateToProps,
};
