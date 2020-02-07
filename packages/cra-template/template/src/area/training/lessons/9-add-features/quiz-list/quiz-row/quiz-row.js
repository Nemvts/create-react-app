// @flow
import React from 'react';
import { NumberField } from '@dealersocket/ds-ui-react/fields/NumberField';
import { Button } from '@dealersocket/ds-ui-react/Button';

type QuizType = {
  expectedResult: ?number,
  id: string,
  isComputing: ?boolean,
  operand1: number,
  operand2: number,
  operation: string,
  result: ?any,
};

type QuizRowProps = {
  computeAction: (payload: { quiz: QuizType, update: boolean }) => void,
  isSelected: boolean,
  onSelect: () => void,
  quiz: QuizType,
  setOperand1Action: (payload: { quizId: string, value: any }) => void,
  setOperand2Action: (payload: { quizId: string, value: any }) => void,
  setResultAction: (payload: { quiz: QuizType, value: any }) => void,
};

export function QuizRow(props: QuizRowProps) {
  const { quiz, isSelected, onSelect } = props;

  const {
    operand1,
    operand2,
    operation,
    isComputing,
    expectedResult,
    result = null,
  } = quiz;

  const quizId = quiz.id;

  const hasResult = Boolean(result) && !Number.isNaN(result);
  const isCorrect = result === expectedResult;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      style={{
        backgroundColor: isSelected ? 'lightBlue' : undefined,
      }}
      onMouseDown={() => {
        if (!isSelected) onSelect();
      }}
    >
      <NumberField
        data-e2e=""
        name="operand1"
        value={operand1}
        width={40}
        onChange={value => props.setOperand1Action({ quizId, value })}
      />
      &nbsp;
      {operation}
      &nbsp;
      <NumberField
        data-e2e=""
        name="operand2"
        value={operand2}
        width={40}
        onChange={value => props.setOperand2Action({ quizId, value })}
      />
      <Button
        disabled={isComputing || !!expectedResult}
        onClick={() => props.computeAction({ quiz, update: true })}
        color="primary"
      >
        {isComputing ? '...' : '='}
      </Button>
      {/* <span>{expectedResult}</span> */}
      <NumberField
        data-e2e=""
        name="result"
        value={result}
        width={100}
        onChange={value => props.setResultAction({ quiz, value })}
      />
      {isComputing && <span>Waiting for API response...</span>}
      {hasResult && isCorrect && (
        <Button
          onClick={() => props.setOperand1Action({ quizId, value: result })}
          color="primary"
        >
          Continue
        </Button>
      )}
    </div>
  );
}
