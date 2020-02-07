// @flow
import React from 'react';
import { Button } from '@dealersocket/ds-ui-react/Button';
import { UsefulLinks } from 'area/training/useful-links/useful-links';
import { QuizList } from '../quiz-list/quiz-list';

type QuizPageProps = {
  addQuizAction: (type: string) => void,
  clearQuizzesAction: () => void,
  isBusy: boolean,

  loadQuizzesAction: () => void,
  quizzes: any[],
  removeQuizAction: (quiz: any) => void,
  resetQuizzesAction: () => void,
  selectNextQuizAction: (next: boolean) => void,
  selectQuizAction: (quiz: any) => void,
  selectedQuizId: string,
};

export class QuizPage extends React.Component<QuizPageProps> {
  static defaultProps = {
    selectedQuizId: null,
  };

  componentDidMount() {
    console.log('QuizPage componentDidMount'); // eslint-disable-line no-console
    this.props.loadQuizzesAction();
  }

  props: QuizPageProps;

  render() {
    const {
      isBusy,
      quizzes,
      selectedQuizId,

      addQuizAction,
      clearQuizzesAction,
      removeQuizAction,
      resetQuizzesAction,
      selectNextQuizAction,
      selectQuizAction,
    } = this.props;

    return (
      <div style={{ fontSize: '16px' }}>
        <div>
          <Button
            disabled={isBusy}
            onClick={() => clearQuizzesAction()}
            color="primary"
          >
            Clear
          </Button>
          <Button
            disabled={isBusy}
            onClick={() => resetQuizzesAction()}
            color="primary"
          >
            Reset
          </Button>
        </div>
        <Button onClick={() => addQuizAction('+')} color="primary">
          Add +
        </Button>
        <Button onClick={() => addQuizAction('-')} color="primary">
          Add -
        </Button>
        <Button onClick={() => addQuizAction('*')} color="primary">
          Add *
        </Button>
        <Button onClick={() => addQuizAction(':')} color="primary">
          Add :
        </Button>

        <QuizList
          quizzes={quizzes}
          selectedQuizId={selectedQuizId}
          selectQuizAction={selectQuizAction}
        />

        <div>
          <Button
            disabled={!selectedQuizId}
            onClick={() => selectNextQuizAction(true)}
            color="primary"
          >
            Selected Next
          </Button>
          <Button
            disabled={!selectedQuizId}
            onClick={() => selectNextQuizAction(false)}
            color="primary"
          >
            Selected Prev
          </Button>
          <Button
            disabled={!selectedQuizId || isBusy}
            onClick={() => removeQuizAction(selectedQuizId)}
            color="primary"
          >
            Remove Selected
          </Button>
        </div>
        <UsefulLinks>
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://vimeo.com/168648012"
          >
            Scaling React Applications
          </a>
        </UsefulLinks>
      </div>
    );
  }
}
