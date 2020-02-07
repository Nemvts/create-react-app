// @flow
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { SelectField } from '@dealersocket/ds-ui-react/fields/SelectField';
import { TextField } from '@dealersocket/ds-ui-react/fields/TextField';

import { getHistory } from '@dealersocket/react-common';

import { MyFuncComponent } from '../lessons/1-func-comp/func-comp';
import { MyClassComponent } from '../lessons/2-class-comp/class-comp';
import { QuizRow as Lesson3 } from '../lessons/3-statefull-comp/quiz-row';
import { QuizRow as Lesson3b } from '../lessons/3b-statefull-comp/quiz-row';
import { QuizRow as Lesson4 } from '../lessons/4-redux/quiz-row';
import { QuizRowContainer as Lesson5 } from '../lessons/5-usecase-pattern/quiz-row';
import { QuizRowContainer as Lesson6 } from '../lessons/6-selectors/quiz-row';
import { QuizRow as Lesson7 } from '../lessons/7-containers/quiz-row';
import { QuizRow as Lesson8 } from '../lessons/8-remote-and-mock-api/quiz-row';
import { QuizPage as Lesson9 } from '../lessons/9-add-features/quiz-page';
import { Tester as Lesson10 } from '../lessons/10-component-queries';

type TrainingPageProps = {
  selectedId: string,
  setNavTitleAction: (title: string) => void,
  setStudentNameAction: (name: string) => void,
  studentName: string,
};

export class TrainingPage extends React.Component<TrainingPageProps> {
  static defaultProps = {
    studentName: '',
    selectedId: '1',
  };

  componentDidMount() {
    this.props.setNavTitleAction('Training');
  }

  onDDChange = (event: any) => {
    getHistory().push(`/training/${event.target.value}`);
  };

  props: TrainingPageProps;

  render() {
    const { studentName } = this.props;
    const renderLesson = () => {
      switch (this.props.selectedId) {
        case '1':
          return <MyFuncComponent studentName={studentName} />;
        case '2':
          return <MyClassComponent studentName={studentName} />;
        case '3':
          return <Lesson3 />;
        case '3b':
          return <Lesson3b />;
        case '4':
          return <Lesson4 />;
        case '5':
          return <Lesson5 />;
        case '6':
          return <Lesson6 />;
        case '7':
          return <Lesson7 />;
        case '8':
          return <Lesson8 />;
        case '9':
          return <Lesson9 />;
        case '10':
          return <Lesson10 />;
        default:
          return '';
      }
    };

    return (
      <div style={{ padding: 20 }}>
        <SelectField
          name="lessons"
          label="Lessons"
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            paddingLeft: 0,
            marginLeft: 0,
          }}
          value={this.props.selectedId}
          onChange={this.onDDChange}
        >
          <MenuItem value="1">1. Functional Component</MenuItem>
          <MenuItem value="2">2. Class Component - lifecycle</MenuItem>
          <MenuItem value="3">3. Stateful - Class Component</MenuItem>
          <MenuItem value="3b">3b. useState - Functional Component</MenuItem>
          <MenuItem value="4">4. Redux</MenuItem>
          <MenuItem value="5">5. Usecase Pattern</MenuItem>
          <MenuItem value="6">6. Selectors</MenuItem>
          <MenuItem value="7">7. Container Components</MenuItem>
          <MenuItem value="8">8. Remote &amp; Local Mock APIs</MenuItem>
          <MenuItem value="9">9. Add Features</MenuItem>
          <MenuItem value="10">10. Component Queries</MenuItem>
        </SelectField>

        <div style={{ display: 'inline-block', width: 100 }} />
        <TextField
          name="student"
          label="Student Name"
          value={this.props.studentName}
          onChange={evt => this.props.setStudentNameAction(evt.target.value)}
        />
        <div>{renderLesson()}</div>
      </div>
    );
  }
}
