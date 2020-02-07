// @flow
import React from 'react';
import { getHistory } from '@dealersocket/react-common';
import { Button } from '@dealersocket/ds-ui-react/Button';

import { CourseList } from './course-list/course-list';

type CoursesPageProps = {
  authors: any[],
  courses: any[],
  loadAuthorsAction: () => void,
  loadCoursesAction: () => void,
  setNavTitleAction: (title: string) => void,
};

export class CoursesPage extends React.Component<CoursesPageProps> {
  static defaultProps = {
    authors: null,
    courses: null,
  };

  componentDidMount() {
    // console.log('CoursePage componentDidMount');
    this.props.setNavTitleAction('Courses');
    this.props.loadCoursesAction();
    this.props.loadAuthorsAction();
  }

  props: CoursesPageProps;

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <Button color="primary" onClick={() => getHistory().push('/course')}>
          {'Add Course'}
        </Button>
        <CourseList authors={this.props.authors} courses={this.props.courses} />
      </div>
    );
  }
}
