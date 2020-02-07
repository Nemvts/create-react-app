// @flow
import { connect } from 'react-redux';
import { authorsFormattedForDropdownSelector } from 'area/author/author.selectors';
import { loadAuthorsAction } from 'area/author/usecases/load-authors.usecase';

import { setNavTitleAction } from 'shared/nav/set-title.usecase';
import { CoursePage } from './course-page';
import { courseEditCloneSelector } from '../course.selectors';

import { loadCoursesAction } from '../courses-page/usecases/load-courses.usecase';
import { selectCourseIdAction } from './usecases/select-course-id.usecase';
import { saveCourseAction } from './usecases/save-course.usecase';
import { deleteCourseAction } from './usecases/delete-course.usecase';

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.match.params.id || ''; // from the path `/course/:id`

  return {
    courseId,
    clone: courseEditCloneSelector(state),
    authors: authorsFormattedForDropdownSelector(state),
  };
}

const mapDispatchToProps = {
  setNavTitleAction,
  selectCourseIdAction,
  loadCoursesAction,
  loadAuthorsAction,
  saveCourseAction,
  deleteCourseAction,
};

export const CoursePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursePage);
