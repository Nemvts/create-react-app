// @flow
import { connect } from 'react-redux';
import {
  isBusySelector,
  quizzesSelector,
  selectedQuizIdSelector,
} from '../lesson9.selectors';
import { quizPageActions } from './usecases';
import { QuizPage } from './quiz-page';

function mapStateToProps(state) {
  return {
    isBusy: isBusySelector(state),
    quizzes: quizzesSelector(state),
    selectedQuizId: selectedQuizIdSelector(state),
  };
}

const mapDispatchToProps = {
  ...quizPageActions,
};

export const QuizPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizPage);
