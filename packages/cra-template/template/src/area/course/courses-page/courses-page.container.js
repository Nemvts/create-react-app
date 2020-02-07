// @flow
import { connect } from 'react-redux';
import { authorsSelector } from 'area/author/author.selectors';
import { loadAuthorsAction } from 'area/author/usecases/load-authors.usecase';
import { setNavTitleAction } from 'shared/nav/set-title.usecase';
import { loadCoursesAction } from './usecases/load-courses.usecase';
import { coursesSelector } from '../course.selectors';
import { CoursesPage } from './courses-page';

function mapStateToProps(state) {
  return {
    authors: authorsSelector(state),
    courses: coursesSelector(state),
  };
}

const mapDispatchToProps = {
  setNavTitleAction,
  loadAuthorsAction,
  loadCoursesAction,
};

export const CoursesPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
