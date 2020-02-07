// @flow
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { openDialogAction } from '@dealersocket/react-common';
import { authorsFormattedForDropdownSelector } from 'area/author/author.selectors';
import { CourseForm } from './course-form';

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.clone,
    handleDelete: ownProps.onDelete,
    authors: authorsFormattedForDropdownSelector(state),
  };
}

const mapDispatchToProps = {
  openDialogAction,
};

// You have to connect() to any reducers that you wish to connect to yourself
export const CourseFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'courseForm',
    enableReinitialize: true,
  })(CourseForm)
);
