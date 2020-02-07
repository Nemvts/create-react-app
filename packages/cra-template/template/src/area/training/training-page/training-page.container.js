// @flow
import { connect } from 'react-redux';
import { setNavTitleAction } from 'shared/nav/set-title.usecase';
import { studentNameSelector } from '../training.selectors';
import { setStudentNameAction } from '../usecases/set-student-name.usecase';

import { TrainingPage } from './training-page';

function mapStateToProps(state, ownProps) {
  return {
    studentName: studentNameSelector(state),
    selectedId: ownProps.match.params.id,
  };
}

const mapDispatchToProps = {
  setNavTitleAction,
  setStudentNameAction,
};

export const TrainingPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingPage);
