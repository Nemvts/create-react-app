// @flow
import React from 'react';

import { CourseFormContainer } from './course-form/course-form.container';

type CoursePageProps = {
  clone: any,
  courseId: string,
  deleteCourseAction: (course: any) => void,
  loadAuthorsAction: () => void,
  loadCoursesAction: () => void,
  saveCourseAction: (course: any) => void,
  selectCourseIdAction: (id: string) => void,
  setNavTitleAction: (title: string) => void,
};

export class CoursePage extends React.Component<CoursePageProps> {
  static defaultProps = {
    clone: undefined,
  };

  componentDidMount() {
    // console.log('CoursePage componentDidMount');
    this.props.setNavTitleAction(
      this.props.courseId ? 'Edit Course' : 'New Course'
    );
    this.props.selectCourseIdAction(this.props.courseId);
    this.props.loadCoursesAction();
    this.props.loadAuthorsAction();
  }

  props: CoursePageProps;

  render() {
    // errors={this.state.errors}
    // saving={this.state.saving}
    // onChange={this.updateCourseState}
    // onSave={this.saveCourse}
    //   course={this.props.course}
    //   allAuthors={this.props.authors}
    if (this.props.clone) {
      // key={this.props.clone.id}
      return (
        <CourseFormContainer
          clone={this.props.clone}
          onSubmit={this.props.saveCourseAction}
          onDelete={() => this.props.deleteCourseAction(this.props.clone)}
        />
      );
    }
    return <div>loading...</div>;
  }
}
