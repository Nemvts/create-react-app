// @flow
import { connect } from 'react-redux';
import { computeAction } from './usecases/compute.usecase';
import { setOperand1Action } from './usecases/set-operand1.usecase';
import { setOperand2Action } from './usecases/set-operand2.usecase';
import { setResultAction } from './usecases/set-result.usecase';
import { QuizRow } from './quiz-row';

const mapDispatchToProps = {
  computeAction,
  setOperand1Action,
  setOperand2Action,
  setResultAction,
};

export const QuizRowContainer = connect(null, mapDispatchToProps)(QuizRow);
