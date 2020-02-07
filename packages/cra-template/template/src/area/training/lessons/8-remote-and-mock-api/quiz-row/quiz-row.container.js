// @flow
import { connect } from 'react-redux';
import { computeAction } from '../usecases/compute.usecase';
import { setOperand1Action } from '../usecases/set-operand1.usecase';
import { lessonSelector } from '../lesson8.selectors';
import { QuizRow } from './quiz-row';

function mapStateToProps(state) {
  return {
    ...lessonSelector(state),
  };
}

const mapDispatchToProps = {
  computeAction,
  setOperand1Action,
};

export const QuizRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizRow);
