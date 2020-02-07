// @flow
import { connect } from 'react-redux';
import { setOperand1Action } from '../usecases/set-operand1.usecase';
import { lessonSelector, resultSelector } from '../lesson7.selectors';
import { QuizRow } from './quiz-row';

function mapStateToProps(state) {
  return {
    ...lessonSelector(state),
    result: resultSelector(state),
  };
}

const mapDispatchToProps = {
  setOperand1Action,
};

export const QuizRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizRow);
